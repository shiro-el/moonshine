'use client';

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, Button } from './index';
import { theme } from '@/theme/theme';

interface NavigationProps {
  logo?: React.ReactNode;
  menuItems?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  ctaButton?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  transparent?: boolean;
  className?: string;
}

interface MobileMenuProps {
  $isOpen: boolean;
}

const NavContainer = styled.nav<{ $transparent: boolean; $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const MenuItem = styled(Link)`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  transition: ${theme.transitions.fast};
  font-weight: 500;
  line-height: 1.4;
  padding: ${theme.spacing.sm} 0;
  
  &:hover {
    color: ${theme.colors.text.white};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text.white};
  cursor: pointer;
  padding: ${theme.spacing.md};
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgb(45, 45, 48);
  transform: translateY(${({ $isOpen }) => $isOpen ? '0' : '-100%'});
  transition: transform ${theme.transitions.medium};
  z-index: 999;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  padding: ${theme.spacing.lg} ${theme.layout.containerPadding};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MobileMenuItem = styled(Link)`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid rgb(45, 45, 48);
  font-weight: 500;
  line-height: 1.4;
  
  &:hover {
    color: ${theme.colors.text.white};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

export const Navigation: React.FC<NavigationProps> = ({
  logo = 'Moonshine',
  menuItems = [
    { label: '홈', href: '/' },
    { label: '컴포넌트', href: '/components' },
    { label: '문서', href: 'https://github.com', external: true },
  ],
  ctaButton = {
    label: '시작하기',
    href: '/components',
    variant: 'primary' as const,
  },
  transparent = false,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavContainer $transparent={transparent} $scrolled={isScrolled} className={className}>
      <NavContent>
        <Logo>
          <Link href="/">{logo}</Link>
        </Logo>

        <DesktopMenu>
          <MenuItems>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                href={item.href}
                external={item.external}
                variant="white"
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuItems>
          
          {ctaButton && (
            <Link href={ctaButton.href}>
              <Button variant={ctaButton.variant} size="sm">
                {ctaButton.label}
              </Button>
            </Link>
          )}
        </DesktopMenu>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </MobileMenuButton>
      </NavContent>

      <MobileMenu $isOpen={isMobileMenuOpen}>
        <MobileMenuContent>
          {menuItems.map((item, index) => (
            <div key={index} onClick={() => setIsMobileMenuOpen(false)}>
              <MobileMenuItem
                href={item.href}
                external={item.external}
                variant="white"
              >
                {item.label}
              </MobileMenuItem>
            </div>
          ))}
          
          {ctaButton && (
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <Link href={ctaButton.href}>
                <Button variant={ctaButton.variant} fullWidth>
                  {ctaButton.label}
                </Button>
              </Link>
            </div>
          )}
        </MobileMenuContent>
      </MobileMenu>
    </NavContainer>
  );
};

export default Navigation;
