'use client';

import GravityStarsBackground from '@/components/animate-ui/components/backgrounds/gravity-stars';
import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * BackgroundWrapper Component
 * 
 * A wrapper component that renders the GravityStarsBackground.
 * It adjusts the number of stars based on the device screen size for better performance.
 */
const BackgroundWrapper = () => {
    // Check if the device is mobile (width <= 768px)
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Reduce star count on mobile for performance optimization
    const starsCount = isMobile ? 30 : 50;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <GravityStarsBackground starsCount={starsCount} />
        </div>
    );
};

export default BackgroundWrapper;
