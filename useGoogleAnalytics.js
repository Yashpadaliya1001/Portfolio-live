import { useState, useEffect } from 'react';

const useGoogleAnalytics = (gaMeasurementId) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      if (!window.gtag && gaMeasurementId) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
        script.async = true;
        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          window.gtag = gtag;
          window.gtag('js', new Date());
          window.gtag('config', gaMeasurementId, {
            debug_mode: process.env.NODE_ENV === 'development',
            send_page_view: false,
            transport_type: 'beacon',
          });
          setIsInitialized(true);
        };
        document.head.appendChild(script);
      } else {
        setIsInitialized(true);
      }
    };
    loadScript();
  }, [gaMeasurementId]);

  return isInitialized;
};

export default useGoogleAnalytics;
