'use client';

import React from 'react';
import styled from 'styled-components';
import { Typography, Button, Link } from './index';
import { theme } from '@/theme/theme';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryButton?: {
    label: string;
    href: string;
    external?: boolean;
  };
  backgroundImage?: string;
  backgroundGradient?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const HeroContainer = styled.section<{ 
  $backgroundImage?: string; 
  $backgroundGradient?: string;
  $height: string;
  $align: string;
}>`
  position: relative;
  min-height: ${({ $height }) => $height};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => {
    switch ($align) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      default: return 'center';
    }
  }};
  text-align: ${({ $align }) => $align};
  padding: ${theme.spacing.xl} 0;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: calc(${({ $height }) => $height} - 10vh);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 70vh;
    padding: ${theme.spacing.lg} 0;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: 60vh;
    padding: ${theme.spacing.md} 0;
  }
  
  ${({ $backgroundImage, $backgroundGradient }) => {
    if ($backgroundImage) {
      return `
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${$backgroundImage});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `;
    }
    if ($backgroundGradient) {
      return `background: ${$backgroundGradient};`;
    }
    return `background: linear-gradient(135deg, ${theme.colors.primary.background} 0%, ${theme.colors.primary.surface} 100%);`;
  }}
`;

const HeroContent = styled.div<{ $align: string }>`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.containerPadding};
  width: 100%;
  z-index: 2;
  position: relative;
  
  ${({ $align }) => {
    switch ($align) {
      case 'left':
        return `text-align: left;`;
      case 'right':
        return `text-align: right;`;
      default:
        return `text-align: center;`;
    }
  }}

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 16px;
  }
`;

const HeroTitle = styled(Typography)`
  margin-bottom: ${theme.spacing.lg};
  font-weight: 700;
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 48px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 36px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 30px;
  }
`;

const HeroSubtitle = styled(Typography)`
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 1.25rem;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.125rem;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const HeroDescription = styled(Typography)<{ $align: string }>`
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  margin-left: ${({ $align }) => {
    switch ($align) {
      case 'left': return '0';
      case 'right': return 'auto';
      default: return 'auto';
    }
  }};
  margin-right: ${({ $align }) => {
    switch ($align) {
      case 'left': return 'auto';
      case 'right': return '0';
      default: return 'auto';
    }
  }};
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const HeroButtons = styled.div<{ $align: string }>`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  
  ${({ $align }) => {
    switch ($align) {
      case 'left':
        return `justify-content: flex-start;`;
      case 'right':
        return `justify-content: flex-end;`;
      default:
        return `justify-content: center;`;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const HeroButton = styled(Link)`
  text-decoration: none;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

const FloatingElement = styled.div<{ $delay: number; $duration: number; $position: string }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${theme.colors.text.tertiary};
  border-radius: 50%;
  opacity: 0.3;
  animation: float ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  
  ${({ $position }) => {
    const [top, left] = $position.split(' ');
    return `
      top: ${top};
      left: ${left};
    `;
  }}
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.6;
    }
  }
`;

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  backgroundGradient,
  height = '100vh',
  align = 'center',
  className,
}) => {
  return (
    <HeroContainer
      $backgroundImage={backgroundImage}
      $backgroundGradient={backgroundGradient}
      $height={height}
      $align={align}
      className={className}
    >
      {backgroundImage && <BackgroundOverlay />}
      
      <FloatingElements>
        <FloatingElement $delay={0} $duration={6} $position="10% 20%" />
        <FloatingElement $delay={2} $duration={8} $position="20% 80%" />
        <FloatingElement $delay={4} $duration={7} $position="80% 10%" />
        <FloatingElement $delay={1} $duration={9} $position="90% 90%" />
        <FloatingElement $delay={3} $duration={5} $position="50% 50%" />
      </FloatingElements>

      <HeroContent $align={align}>
        {subtitle && (
          <HeroSubtitle variant="large" color="secondary">
            {subtitle}
          </HeroSubtitle>
        )}
        
        <HeroTitle variant="h1" color="white">
          {title}
        </HeroTitle>
        
        {description && (
          <HeroDescription variant="large" color="secondary" $align={align}>
            {description}
          </HeroDescription>
        )}
        
        {(primaryButton || secondaryButton) && (
          <HeroButtons $align={align}>
            {primaryButton && (
              <HeroButton href={primaryButton.href} external={primaryButton.external}>
                <Button variant="primary" size="lg">
                  {primaryButton.label}
                </Button>
              </HeroButton>
            )}
            
            {secondaryButton && (
              <HeroButton href={secondaryButton.href} external={secondaryButton.external}>
                <Button variant="secondary" size="lg">
                  {secondaryButton.label}
                </Button>
              </HeroButton>
            )}
          </HeroButtons>
        )}
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
