'use client';

import GravityStarsBackground from '@/components/animate-ui/components/backgrounds/gravity-stars';
import { useMediaQuery } from '@/hooks/use-media-query';

const BackgroundWrapper = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const starsCount = isMobile ? 30 : 50;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <GravityStarsBackground starsCount={starsCount} />
        </div>
    );
};

export default BackgroundWrapper;
