export const mockContactSubmission = async (formData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock Contact Form Submission:', formData);
      resolve({
        success: true,
        message: 'Thank you for reaching out! Your message has been received.',
      });
    }, 1000);
  });
};

export const profileData = {
  name: 'Yash Padaliya',
  role: 'Customer & Trading Manager',
  location: 'Ilford, England, United Kingdom',
  email: 'yashpadaliya10@gmail.com',
  phone: '07774658971',
  linkedin: 'https://www.linkedin.com/in/yash-padaliya-857413221/',
  instagram: 'https://www.instagram.com/yashpadaliya1001',
  tagline: 'Retail Strategy | AI Automation | Data-Driven Growth',
};

export const metrics = [
  {
    title: 'Retail Operations Leadership',
    description: 'Led daily operations in high-volume retail environment',
  },
  {
    title: 'Team Performance',
    description: 'Managed team performance & KPI delivery',
  },
  {
    title: 'MSc International Business',
    description: 'MSc International Business Management',
  },
  {
    title: 'AI Review System',
    description: 'Built AI system to increase Google review conversion',
  },
];

export const mainProjects = [
  {
    id: 1,
    title: 'AI Review System',
    category: 'AI Automation & Growth',
    problem: 'Local businesses struggle with review acquisition and trust visibility, losing potential customers to competitors with stronger online reputations.',
    solution: 'Built an AI-powered QR review automation system that simplifies review capture through intelligent prompts and seamless user experience.',
    outcome: 'Increased review submission efficiency by 300%, improved digital trust positioning, and generated measurable increases in customer conversions.',
    tools: ['AI/ML', 'QR Technology', 'Automation', 'Review Management', 'Data Analytics'],
    image: 'https://images.unsplash.com/photo-1549399905-5d1bad747576?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDB8fHx8MTc3MTg3MDIzNnww&ixlib=rb-4.1.0&q=85',
    accent: 'var(--accent-green)',
  },
  {
    id: 2,
    title: 'Social Media Growth Strategy',
    category: 'Digital Marketing & Collaboration',
    problem: 'Brands struggle to build authentic engagement and convert social media presence into measurable business growth.',
    solution: 'Developed data-driven social media strategies combining content optimization, audience targeting, and collaboration frameworks.',
    outcome: 'Achieved consistent follower growth, improved engagement rates, and established strategic partnerships driving business opportunities.',
    tools: ['Social Media Marketing', 'Content Strategy', 'Analytics', 'Collaboration', 'Growth Hacking'],
    image: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg',
    accent: 'var(--accent-purple)',
  },
];

export const experiences = [
  {
    id: 1,
    title: 'Customer & Trading Manager',
    organization: 'Sainsbury\'s',
    period: '2023 - Present',
    description: 'Leading retail operations across high-volume environments, driving commercial performance through KPI management, team development, and merchandising optimization.',
    achievements: [
      'Managed daily operations for high-volume retail location',
      'Led team performance and achieved KPI targets consistently',
      'Optimized merchandising and inventory management',
      'Ensured compliance and maintained operational excellence',
    ],
    accent: 'var(--accent-blue)',
    image: 'https://customer-assets.emergentagent.com/job_data-driven-growth-1/artifacts/kozzk3s3_85f3f4a6-8508-41eb-abaa-734f1bf35fe4.jpeg',
  },
  {
    id: 2,
    title: 'Financial Analysis Simulation',
    organization: 'JPMorgan Chase & Co.',
    period: '2024',
    description: 'Completed advanced financial analysis simulation focusing on investment evaluation, DCF modeling, and client-ready recommendation development.',
    achievements: [
      'Performed DCF modeling for acquisition target evaluation',
      'Analyzed financial viability and investment returns',
      'Delivered 2-page client-ready investment analysis',
      'Demonstrated strategic financial decision-making',
    ],
    accent: 'var(--accent-orange)',
  },
  {
    id: 3,
    title: 'Volunteer - Impact Measurement',
    organization: 'Money4YOU',
    period: '2023 - Present',
    description: 'Contributing to financial planning and impact measurement initiatives, supporting community financial literacy and sustainable growth.',
    achievements: [
      'Supported impact measurement frameworks',
      'Contributed to financial planning initiatives',
      'Helped improve community financial literacy',
      'Collaborated on sustainable growth strategies',
    ],
    accent: 'var(--accent-pink)',
  },
];

export const services = [
  {
    id: 1,
    title: 'Retail Strategy & Operational Optimisation',
    description: 'Transform retail operations with data-driven strategies, KPI structuring, and performance management systems that deliver measurable results.',
    icon: 'TrendingUp',
    accent: 'var(--accent-blue)',
  },
  {
    id: 2,
    title: 'AI Review System Implementation',
    description: 'Implement automated review collection systems that increase customer feedback, improve online reputation, and drive trust-based conversions.',
    icon: 'Sparkles',
    accent: 'var(--accent-green)',
  },
  {
    id: 3,
    title: 'Data-Driven Business Insights',
    description: 'Leverage data analytics and business intelligence to uncover growth opportunities, optimize decision-making, and maximize commercial performance.',
    icon: 'BarChart3',
    accent: 'var(--accent-purple)',
  },
];

export const credentials = [
  'Sainsbury\'s - Customer & Trading Manager',
  'University of East London - MSc International Business Management',
  '1,963 LinkedIn followers',
  '500+ professional connections',
];
