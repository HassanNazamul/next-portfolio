'use client';

import Experience from '@/components/experience';
import Hero from '@/components/hero';

import { InView } from '@/components/ui/in-view';
import ContactMe from '@/components/contact-me';
import AboutMe from '@/components/about';
import { ProjectShowcase } from "@/components/project-showcase";

/**
 * HomePage Component
 * 
 * This is the main landing page component that orchestrates the layout of various sections.
 * It uses the InView component to trigger animations as the user scrolls through the page.
 */
export default function HomePage() {
    return (
        <>
            <InView
                variants={{
                    hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                viewOptions={{ margin: '0px 0px -200px 0px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <Hero />
            </InView>

            <InView
                variants={{
                    hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                viewOptions={{ margin: '0px 0px -200px 0px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div
                    className="mx-auto w-[8px] h-30 bg-gradient-to-b from-transparent via-[#a8a9ad] to-transparent dark:via-[#6b6c70]"
                />
            </InView>


            <InView
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        filter: 'blur(6px)',
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                    },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                viewOptions={{ margin: '0px 0px -350px 0px' }}
            >
                <AboutMe maxTilt={15} perspective={1000} />

            </InView>

            <InView
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        filter: 'blur(6px)',
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                    },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                viewOptions={{ margin: '0px 0px -350px 0px' }}
            >

                <Experience />
            </InView>

            <InView
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        filter: 'blur(6px)',
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                    },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                viewOptions={{ margin: '0px 0px -350px 0px' }}
            >
                <ProjectShowcase />
            </InView>

            <InView
                variants={{
                    hidden: {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
                        filter: 'blur(6px)',
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                    },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                viewOptions={{ margin: '0px 0px -350px 0px' }}
            >
                <ContactMe />
            </InView>
        </>
    );
}
