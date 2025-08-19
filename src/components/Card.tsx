'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { theme } from '@/theme/theme';

type CardVariant = 'default' | 'surface' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardBorderRadius = 'sm' | 'md' | 'lg';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  borderRadius?: CardBorderRadius;
  hover?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
  as?: React.ElementType;
  image?: {
    src: string;
    alt: string;
    height?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  };
}

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $borderRadius: CardBorderRadius;
  $hover: boolean;
  $clickable: boolean;
  $hasImage: boolean;
}>`
  background-color: ${theme.colors.primary.surface};
  border: 1px solid transparent;
  transition: ${theme.transitions.medium};
  position: relative;
  overflow: hidden;
  
  ${({ $clickable }) => $clickable && css`
    cursor: pointer;
  `}
  
  ${({ $hasImage }) => $hasImage && css`
    padding: 0;
  `}
  
  // 변형별 스타일
  ${({ $variant }) => {
    switch ($variant) {
      case 'surface':
        return css`
          background-color: ${theme.colors.primary.surfaceSecondary};
        `;
      case 'elevated':
        return css`
          background-color: ${theme.colors.primary.surface};
          border: 1px solid rgb(45, 45, 48);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
      default:
        return css`
          background-color: ${theme.colors.primary.surface};
        `;
    }
  }}
  
  // 패딩 설정
  ${({ $padding, $hasImage }) => {
    if ($hasImage) return css`padding: 0;`;
    
    switch ($padding) {
      case 'none':
        return css`padding: 0;`;
      case 'sm':
        return css`padding: ${theme.spacing.md};`;
      case 'md':
        return css`padding: ${theme.spacing.lg};`;
      case 'lg':
        return css`padding: ${theme.spacing.xl};`;
      default:
        return css`padding: ${theme.spacing.lg};`;
    }
  }}
  
  // Border Radius 설정
  ${({ $borderRadius }) => {
    switch ($borderRadius) {
      case 'sm':
        return css`border-radius: ${theme.borderRadius.sm};`;
      case 'md':
        return css`border-radius: ${theme.borderRadius.md};`;
      case 'lg':
        return css`border-radius: ${theme.borderRadius.lg};`;
      default:
        return css`border-radius: ${theme.borderRadius.md};`;
    }
  }}
  
  // 호버 효과
  ${({ $hover, $clickable }) => ($hover || $clickable) && css`
    &:hover {
      background-color: rgb(30, 31, 32);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  `}
`;

const CardImage = styled.div<{ $height?: string; $objectFit?: string }>`
  width: 100%;
  height: ${({ $height }) => $height || '200px'};
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
    transition: ${theme.transitions.medium};
  }
`;

const CardContentWrapper = styled.div<{ $hasImage: boolean }>`
  ${({ $hasImage }) => $hasImage && css`
    padding: ${theme.spacing.lg};
  `}
`;

const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.headings.h3.fontSize};
  font-weight: ${theme.typography.headings.h3.fontWeight};
  line-height: ${theme.typography.headings.h3.lineHeight};
  letter-spacing: ${theme.typography.headings.h3.letterSpacing};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const CardSubtitle = styled.p`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.small.fontSize};
  font-weight: ${theme.typography.small.fontWeight};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const CardContent = styled.div`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.body.fontSize};
  line-height: ${theme.typography.body.lineHeight};
`;

const CardFooter = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgb(45, 45, 48);
`;

const CardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  justify-content: flex-end;
  margin-top: ${theme.spacing.md};
`;

export const Card = ({
  variant = 'default',
  padding = 'md',
  borderRadius = 'md',
  hover = false,
  clickable = false,
  children,
  as = 'div',
  image,
  ...props
}: CardProps) => {
  const hasImage = !!image;

  return (
    <StyledCard
      as={as}
      $variant={variant}
      $padding={padding}
      $borderRadius={borderRadius}
      $hover={hover}
      $clickable={clickable}
      $hasImage={hasImage}
      {...props}
    >
      {hasImage && (
        <CardImage $height={image?.height} $objectFit={image?.objectFit}>
          <Image src={image.src} alt={image.alt} fill style={{ objectFit: image?.objectFit || 'cover' }} />
        </CardImage>
      )}
      <CardContentWrapper $hasImage={hasImage}>
        {children}
      </CardContentWrapper>
    </StyledCard>
  );
};

// 서브 컴포넌트들 할당
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Actions = CardActions;

export default Card;
