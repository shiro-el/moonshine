'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'large';
type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'white';
type TextAlign = 'left' | 'center' | 'right';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TextAlign;
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  weight?: string;
  style?: React.CSSProperties;
}

const StyledTypography = styled.div<{
  $variant: TypographyVariant;
  $color: TypographyColor;
  $align: TextAlign;
  $weight?: string;
}>`
  font-family: ${theme.typography.fontFamily.primary};
  margin: 0;
  text-align: ${({ $align }) => $align};
  word-break: keep-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  // 색상 설정
  ${({ $color }) => {
    switch ($color) {
      case 'primary':
        return css`color: ${theme.colors.text.primary};`;
      case 'secondary':
        return css`color: ${theme.colors.text.secondary};`;
      case 'tertiary':
        return css`color: ${theme.colors.text.tertiary};`;
      case 'white':
        return css`color: ${theme.colors.text.white};`;
      default:
        return css`color: ${theme.colors.text.primary};`;
    }
  }}
  
  // 변형별 스타일
  ${({ $variant, $weight }) => {
    const getVariantStyles = () => {
      switch ($variant) {
        case 'h1':
          return css`
            font-size: ${theme.typography.headings.h1.fontSize};
            font-weight: ${$weight || theme.typography.headings.h1.fontWeight};
            line-height: ${theme.typography.headings.h1.lineHeight};
            letter-spacing: ${theme.typography.headings.h1.letterSpacing};
          `;
        case 'h2':
          return css`
            font-size: ${theme.typography.headings.h2.fontSize};
            font-weight: ${$weight || theme.typography.headings.h2.fontWeight};
            line-height: ${theme.typography.headings.h2.lineHeight};
            letter-spacing: ${theme.typography.headings.h2.letterSpacing};
          `;
        case 'h3':
          return css`
            font-size: ${theme.typography.headings.h3.fontSize};
            font-weight: ${$weight || theme.typography.headings.h3.fontWeight};
            line-height: ${theme.typography.headings.h3.lineHeight};
            letter-spacing: ${theme.typography.headings.h3.letterSpacing};
          `;
        case 'h4':
          return css`
            font-size: ${theme.typography.headings.h4.fontSize};
            font-weight: ${$weight || theme.typography.headings.h4.fontWeight};
            line-height: ${theme.typography.headings.h4.lineHeight};
            letter-spacing: ${theme.typography.headings.h4.letterSpacing};
          `;
        case 'body':
          return css`
            font-size: ${theme.typography.body.fontSize};
            font-weight: ${$weight || theme.typography.body.fontWeight};
            line-height: ${theme.typography.body.lineHeight};
          `;
        case 'small':
          return css`
            font-size: ${theme.typography.small.fontSize};
            font-weight: ${$weight || theme.typography.small.fontWeight};
            line-height: ${theme.typography.small.lineHeight};
          `;
        case 'large':
          return css`
            font-size: ${theme.typography.large.fontSize};
            font-weight: ${$weight || theme.typography.large.fontWeight};
          `;
        default:
          return css`
            font-size: ${theme.typography.body.fontSize};
            font-weight: ${$weight || theme.typography.body.fontWeight};
            line-height: ${theme.typography.body.lineHeight};
          `;
      }
    };
    
    return getVariantStyles();
  }}
`;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  children,
  as,
  className,
  weight,
  style,
  ...props
}) => {
  // variant에 따라 기본 HTML 태그 결정
  const getDefaultTag = (variant: TypographyVariant) => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'small': return 'small';
      default: return 'p';
    }
  };

  return (
    <StyledTypography
      as={as || getDefaultTag(variant)}
      $variant={variant}
      $color={color}
      $align={align}
      $weight={weight}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
