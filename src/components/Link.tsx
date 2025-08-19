'use client';

import React from 'react';
import NextLink from 'next/link';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

type LinkVariant = 'primary' | 'secondary' | 'white';
type LinkSize = 'sm' | 'md' | 'lg';

interface CustomLinkProps {
  variant?: LinkVariant;
  size?: LinkSize;
  underline?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

interface InternalLinkProps extends CustomLinkProps {
  href: string;
  external?: false;
}

interface ExternalLinkProps extends CustomLinkProps {
  href: string;
  external: true;
  target?: string;
  rel?: string;
}

type LinkProps = InternalLinkProps | ExternalLinkProps;

const StyledLink = styled.a<{
  $variant: LinkVariant;
  $size: LinkSize;
  $underline: boolean;
  $disabled: boolean;
}>`
  font-family: ${theme.typography.fontFamily.primary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: ${theme.transitions.fast};
  text-decoration: ${({ $underline }) => $underline ? 'underline' : 'none'};
  outline: none;
  
  &:focus {
    outline: none;
  }
  
  &:active {
    outline: none;
  }
  
  ${({ $disabled }) => $disabled && css`
    opacity: ${theme.effects.opacity.disabled};
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  // 변형별 스타일
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          color: ${theme.components.link.primary.color};
          font-size: ${theme.components.link.primary.fontSize};
          font-weight: ${theme.components.link.primary.fontWeight};
          
          &:hover:not(:disabled) {
            opacity: ${theme.effects.opacity.hover};
            text-decoration: underline;
          }
        `;
      case 'secondary':
        return css`
          color: ${theme.components.link.secondary.color};
          font-size: ${theme.components.link.secondary.fontSize};
          font-weight: ${theme.components.link.secondary.fontWeight};
          
          &:hover:not(:disabled) {
            color: ${theme.colors.text.primary};
          }
        `;
      case 'white':
        return css`
          color: ${theme.components.link.white.color};
          font-size: ${theme.components.link.white.fontSize};
          font-weight: ${theme.components.link.white.fontWeight};
          
          &:hover:not(:disabled) {
            opacity: ${theme.effects.opacity.hover};
          }
        `;
      default:
        return '';
    }
  }}
  
  // 크기별 스타일
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          font-size: ${theme.typography.small.fontSize};
        `;
      case 'lg':
        return css`
          font-size: ${theme.typography.large.fontSize};
        `;
      default:
        return '';
    }
  }}
`;

const IconWrapper = styled.span<{ $position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  ${({ $position }) => $position === 'left' 
    ? `margin-right: ${theme.spacing.xs};` 
    : `margin-left: ${theme.spacing.xs};`}
`;

export const Link: React.FC<LinkProps> = ({
  variant = 'primary',
  size = 'md',
  underline = false,
  disabled = false,
  children,
  href,
  ...props
}) => {
  const linkProps = {
    $variant: variant,
    $size: size,
    $underline: underline,
    $disabled: disabled,
  };

  // 외부 링크인 경우
  if ('external' in props && props.external) {
    return (
      <StyledLink
        href={href}
        target={props.target || '_blank'}
        rel={props.rel || 'noopener noreferrer'}
        {...linkProps}
      >
        {children}
      </StyledLink>
    );
  }

  // 내부 링크인 경우 Next.js Link 사용
  return (
    <NextLink href={href} style={{ textDecoration: 'none' }}>
      <StyledLink as="span" {...linkProps}>
        {children}
      </StyledLink>
    </NextLink>
  );
};

// 아이콘과 함께 사용할 수 있는 유틸리티 컴포넌트
export const LinkWithIcon: React.FC<LinkProps & { 
  icon: React.ReactNode; 
  iconPosition?: 'left' | 'right' 
}> = ({
  icon,
  iconPosition = 'left',
  children,
  ...linkProps
}) => {
  return (
    <Link {...linkProps}>
      {iconPosition === 'left' && (
        <IconWrapper $position="left">
          {icon}
        </IconWrapper>
      )}
      {children}
      {iconPosition === 'right' && (
        <IconWrapper $position="right">
          {icon}
        </IconWrapper>
      )}
    </Link>
  );
};

export default Link;
