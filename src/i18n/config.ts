import { getRequestConfig } from 'next-intl/server';

// 지원하는 언어 목록
export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

// 기본 언어
export const defaultLocale: Locale = 'ko';

export default getRequestConfig(async ({ locale }) => {
  // locale이 없거나 지원하지 않는 경우 기본 언어 사용
  const validLocale = locale && locales.includes(locale as Locale) ? locale : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
