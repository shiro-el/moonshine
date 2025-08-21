import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moonshine Brewing Club - 문샤인 양조 동아리",
  description: "수제 맥주와 발효 문화를 함께 배우고 만드는 다크 테마 기반 동아리 홈페이지. 정기 양조, 테이스팅, 스터디 진행.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#08090a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
