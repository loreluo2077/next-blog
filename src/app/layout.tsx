import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { blogConfig } from "@/blog.config";
import ProviderTheme from "@/provider/provider-theme";
import Title from "@/components/title";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import Analytics from "@/plugins/analytics";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: blogConfig.title,
    description: blogConfig.description,
};

export default async function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    // if (!hasLocale(routing.locales, locale)) {
    //     notFound();
    // }

    return (
        <html lang={locale}>
            <NextIntlClientProvider>
                <ProviderTheme>
                    <body className={'relative min-h-screen font-mono flex flex-col justify-between'}>
                        <div className={'flex-1'}>
                            <Header />
                            <main className={'md:mb-12 mb-8 min-w-full prose md:prose-lg dark:prose-invert'}>
                                <Title />
                                {children}
                            </main>
                        </div>
                        <Footer />
                        <BackToTop />
                        <Analytics />
                    </body>
                </ProviderTheme>
            </NextIntlClientProvider>
        </html >
    );
}
