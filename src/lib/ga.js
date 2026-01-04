// src/lib/ga.js

// TODO: Replace with your actual Measurement ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XD1ECJV58S';

// Log the pageview with their URL
export const pageview = (url) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Log specific events happened.
export const event = ({ action, category, label, value }) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
