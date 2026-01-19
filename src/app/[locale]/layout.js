import "@/app/globals.css";
import Navbar from "@/components/navbar";
import BackgroundWrapper from "@/components/background-wrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Metadata for the application
export const metadata = {
    title: "My Portfolio",
    description: "Portfolio",
};

/**
 * LocaleLayout Component
 * 
 * The root layout for the internationalized application.
 * It handles:
 * - Locale validation.
 * - Loading messages for the client.
 * - Wrapping the app in providers (NextIntl, Theme).
 * 
 * @param {Object} props - Layout props.
 * @param {React.ReactNode} props.children - Child components.
 * @param {Object} props.params - Route parameters (contains locale).
 */
export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="antialiased">
                <GoogleAnalytics />
                <NextIntlClientProvider messages={messages}>
                    <BackgroundWrapper />
                    <Navbar />
                    <main>{children}</main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
