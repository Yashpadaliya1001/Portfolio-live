from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection - will be initialized on startup
client: Optional[AsyncIOMotorClient] = None
db = None
db_connected = False

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World", "status": "ok"}

@api_router.get("/health")
async def api_health():
    """Health check endpoint for API"""
    return {
        "status": "healthy",
        "database": "connected" if db_connected else "disconnected"
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    if not db_connected or db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    try:
        _ = await db.status_checks.insert_one(doc)
        return status_obj
    except Exception as e:
        logger.error(f"Error inserting status check: {e}")
        raise HTTPException(status_code=500, detail="Failed to create status check")

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if not db_connected or db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        # Exclude MongoDB's _id field from the query results
        status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for check in status_checks:
            if isinstance(check['timestamp'], str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        
        return status_checks
    except Exception as e:
        logger.error(f"Error fetching status checks: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch status checks")

# Include the router in the main app
app.include_router(api_router)

# Root level health check (for Kubernetes probes)
@app.get("/health")
async def health_check():
    """
    Health check endpoint for Kubernetes liveness/readiness probes.
    Returns 200 OK even if database is not connected.
    """
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy",
            "service": "portfolio-backend",
            "database": "connected" if db_connected else "disconnected"
        }
    )

@app.get("/healthz")
async def healthz():
    """Alternative health check endpoint"""
    return {"status": "ok"}

@app.get("/")
async def root_redirect():
    """Root endpoint"""
    return {"message": "Portfolio API", "status": "running", "docs": "/docs"}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    """Initialize MongoDB connection on startup"""
    global client, db, db_connected
    
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'test_database')
    
    logger.info(f"Attempting to connect to MongoDB at {mongo_url}")
    
    try:
        # Create MongoDB client with timeout settings
        client = AsyncIOMotorClient(
            mongo_url,
            serverSelectionTimeoutMS=5000,  # 5 second timeout
            connectTimeoutMS=5000,
            socketTimeoutMS=5000,
        )
        
        # Try to connect and verify connection
        await client.admin.command('ping')
        
        db = client[db_name]
        db_connected = True
        logger.info(f"Successfully connected to MongoDB database: {db_name}")
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        logger.warning("Application will start without database connection")
        db_connected = False
        # Don't fail startup - allow app to run without DB

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection on shutdown"""
    global client, db_connected
    
    if client:
        logger.info("Closing MongoDB connection")
        client.close()
        db_connected = False
