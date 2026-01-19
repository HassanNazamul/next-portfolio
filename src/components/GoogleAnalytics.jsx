'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';
import { GA_TRACKING_ID, pageview, event } from '../lib/ga';

/**
 * GoogleAnalytics Component
 * 
 * Handles Google Analytics integration including:
 * - Pageview tracking on route changes.
 * - Scroll depth tracking (25%, 50%, 75%, 100%).
 * - Time on page tracking (10s, 30s, 60s, 120s).
 * - Auto-tracking of clicks on external links and specific buttons (GitHub, LinkedIn, etc.).
 * - Basic form submission tracking.
 */
export default function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const scrollTracked = useRef(new Set());
    const timeTracked = useRef(new Set());
    const startTime = useRef(Date.now());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Track Pageviews
    useEffect(() => {
        if (pathname && isMounted) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
            pageview(url);

            // Reset engagement metrics on page change
            scrollTracked.current = new Set();
            timeTracked.current = new Set();
            startTime.current = Date.now();
        }
    }, [pathname, searchParams, isMounted]);

    // Engagement & Auto-Event Tracking
    useEffect(() => {
        if (!isMounted) return;

        // Scroll Tracking ---
        // Tracks how far down the page the user has scrolled
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';

            const percent = Math.round(
                ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
            );

            [25, 50, 75, 100].forEach((milestone) => {
                if (percent >= milestone && !scrollTracked.current.has(milestone)) {
                    scrollTracked.current.add(milestone);
                    event({
                        action: `scroll_depth_${milestone}`,
                        category: 'engagement',
                        label: `${milestone}%`,
                        value: milestone,
                    });
                }
            });
        };

        // Time on Page Tracking ---
        // Tracks how long the user stays on the page
        const intervalId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
            [10, 30, 60, 120].forEach((milestone) => {
                if (elapsed >= milestone && !timeTracked.current.has(milestone)) {
                    timeTracked.current.add(milestone);
                    event({
                        action: `time_on_page_${milestone}`,
                        category: 'engagement',
                        label: `${milestone}s`,
                        value: milestone,
                    });
                }
            });
        }, 1000);

        //  Click Tracking (Delegate) ---
        // Tracks clicks on links and buttons, categorizing them based on href or text
        const handleClick = (e) => {
            const el = e.target.closest('a, button');
            if (!el) return;

            const href = el.getAttribute('href') || '';
            const text = el.innerText || el.ariaLabel || 'unknown';
            const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);

            let action = 'click';
            let category = 'ui_interaction';
            let label = text;

            // Classify events
            if (href.toLowerCase().includes('resume')) {
                action = 'resume_download';
                category = 'conversion';
            } else if (href.includes('linkedin.com')) {
                action = 'linkedin_click';
                category = 'social';
            } else if (href.includes('github.com')) {
                action = 'github_click';
                category = 'social';
            } else if (href.includes('whatsapp') || href.startsWith('tel:') || href.startsWith('mailto:')) {
                action = 'contact_click';
                category = 'contact';
            } else if (isExternal) {
                action = 'outbound_link';
                category = 'navigation';
                label = href;
            }

            event({ action, category, label });
        };

        //  Form Submit Tracking (Delegate) ---
        // Tracks form submissions
        const handleSubmit = (e) => {
            // Best effort for finding which form
            const form = e.target.closest('form');
            if (form) {
                event({
                    action: 'form_submit', // Generic fallback
                    category: 'form',
                    label: form.getAttribute('action') || form.id || 'unknown_form'
                });

                // Specific check for contact forms if identifiable
                if (form.innerHTML.toLowerCase().includes('contact') || form.getAttribute('id')?.includes('contact')) {
                    event({ action: 'contact_submit', category: 'conversion', label: 'contact_form' });
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('click', handleClick, { passive: true });
        window.addEventListener('submit', handleSubmit, { passive: true }); // Capture phase might be better but bubbling often tracking ok for standard events

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('submit', handleSubmit);
            clearInterval(intervalId);
        };
    }, [isMounted, pathname]); // Re-bind if pathname changes to reset scope if needed, though mostly global

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true, // GDPR friendly
              send_page_view: false // Manual handling in useEffect
            });
          `,
                }}
            />
        </>
    );
}
