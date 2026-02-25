import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Portfolio from "./pages/Portfolio";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";

const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;

const PageTracker = ({ isGaInitialized }) => {
  const location = useLocation();

  useEffect(() => {
    if (isGaInitialized && window.gtag && measurementId) {
      window.gtag('config', measurementId, {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location, isGaInitialized]);

  return null;
};

function App() {
  const isGaInitialized = useGoogleAnalytics(measurementId);

  return (
    <div className="App">
      <BrowserRouter>
        <PageTracker isGaInitialized={isGaInitialized} />
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
