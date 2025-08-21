'use client';

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, Button, Typography } from './index';
import { theme } from '@/theme/theme';

interface NavigationProps {
  logo?: React.ReactNode;
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
  align-items: center;
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

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text.white};
  cursor: pointer;
  padding: ${theme.spacing.md};
  min-width: 44px;
  min-height: 44px;
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Navigation: React.FC<NavigationProps> = ({
  logo = 'Moonshine',
  transparent = false,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // 스크롤 시 모바일 메뉴 닫기
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <NavContainer $transparent={transparent} $scrolled={isScrolled} className={className}>
      <NavContent>
        <Logo>
          <Link href="/">{logo}</Link>
        </Logo>

        <Logo>
          <Link href="/recruit">
            <Typography variant="h3" color="white">지원</Typography>
          </Link>
        </Logo>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;
