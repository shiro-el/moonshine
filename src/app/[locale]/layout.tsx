import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "../providers/ThemeProvider";
import { locales, type Locale } from "@/i18n/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    ko: "Moonshine Brewing Club - 문샤인 양조 동아리",
    en: "Moonshine Brewing Club - Craft Brewing Community"
  };
  
  const descriptions = {
    ko: "수제 맥주와 발효 문화를 함께 배우고 만드는 다크 테마 기반 동아리 홈페이지. 정기 양조, 테이스팅, 스터디 진행.",
    en: "A dark-themed club homepage for learning and creating craft beer and fermentation culture together. Regular brewing, tasting, and study sessions."
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  console.log(locale);
  const messages = await getMessages({ locale });

    return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#08090a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
