'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  variant?: 'primary' | 'secondary' | 'card';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LanguageSwitcher({ 
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageToggle = () => {
    // 현재 언어가 아닌 다른 언어로 변경
    const currentIndex = locales.indexOf(locale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const newLocale = locales[nextIndex];
    
    // 현재 경로에서 언어 부분을 새로운 언어로 교체
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
      <Globe size={16}
        onClick={handleLanguageToggle}
      />
  );
}
