export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackButtonClick = (buttonName, buttonLocation) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    page_location: window.location.pathname,
  });
};

export const trackFormSubmission = (formName, formData = {}) => {
  trackEvent('form_submission', {
    form_name: formName,
    form_fields: Object.keys(formData).length,
    page_location: window.location.pathname,
  });
};

export const trackScroll = (scrollPercentage) => {
  trackEvent('page_scroll', {
    scroll_percentage: scrollPercentage,
    page_location: window.location.pathname,
  });
};

export const trackException = (description, fatal = false) => {
  trackEvent('exception', {
    description: description,
    fatal: fatal,
  });
};

export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    section_name: sectionName,
    page_location: window.location.pathname,
  });
};
