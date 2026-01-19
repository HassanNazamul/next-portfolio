
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create Next.js middleware for internationalization
export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // - / (homepage)
    // - /fr or /en (supported locales)
    // - /fr/* or /en/* (subpaths)
    matcher: ['/', '/(fr|en)/:path*']
};
