import { useState, useEffect } from 'react';

/**
 * Custom hook to programmatically check if a media query matches the current viewport.
 * 
 * @param {string} query - The media query string to check (e.g., "(min-width: 768px)").
 * @returns {boolean} True if the media query matches, false otherwise.
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Create a MediaQueryList object
        const media = window.matchMedia(query);

        // Set initial state
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        // Define listener to update state on change
        const listener = () => setMatches(media.matches);

        // Listen for changes in the media query status
        window.addEventListener('resize', listener);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);

    return matches;
}
