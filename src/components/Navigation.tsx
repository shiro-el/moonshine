'use client';

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTranslations, useLocale } from 'next-intl';
import { Link, LanguageSwitcher } from './index';
import { theme } from '@/theme/theme';

interface NavigationProps {
  logo?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

const NavContainer = styled.nav<{ $transparent: boolean; $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${theme.layout.containerPadding};
  transition: ${theme.transitions.medium};
  backdrop-filter: blur(10px);
  
  ${({ $transparent, $scrolled }) => {
    if ($transparent && !$scrolled) {
      return css`
        background: transparent;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      `;
    }
    return css`
      background: rgba(0, 0, 0, 0.8);
      border-bottom: 1px solid rgb(45, 45, 48);
    `;
  }}
`;

const NavContent = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.containerPadding};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    height: 68px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 60px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: ${theme.typography.headings.h2.fontSize};
  line-height: 1.2;
  color: ${theme.colors.text.white};
  
  a {
    text-decoration: none;
    color: inherit;
    outline: none;
    
    &:focus {
      outline: none;
    }
    
    &:active {
      outline: none;
    }
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.typography.headings.h3.fontSize};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 18px;
  }
`;

const RightMenu = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  gap: ${theme.spacing.lg};
`;

const MenuItem = styled(Link)`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  transition: ${theme.transitions.fast};
  font-weight: 500;
  line-height: 1.4;
  font-size: ${theme.typography.headings.h3.fontSize};
  padding: ${theme.spacing.sm} 0;
  outline: none;
  
  &:hover {
    color: ${theme.colors.text.white};
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    outline: none;
  }
`;

export const Navigation: React.FC<NavigationProps> = ({
  logo = 'Moonshine',
  transparent = false,
  className,
}) => {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavContainer $transparent={transparent} $scrolled={isScrolled} className={className}>
      <NavContent>
        <Logo>
          <Link href={`/${locale}`}>{logo}</Link>
        </Logo>

        <RightMenu>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSwitcher/>
          <MenuItem href={`/${locale}/recruit`}>{t('recruit')}</MenuItem>
          </div>
        </RightMenu>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;
