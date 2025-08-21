'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';
import { Typography } from './Typography';

type SectionVariant = 'default' | 'surface' | 'transparent';
type SectionAlign = 'left' | 'center' | 'right';
type SectionPadding = 'sm' | 'md' | 'lg';

interface SectionProps {
  id?: string;
  variant?: SectionVariant;
  align?: SectionAlign;
  padding?: SectionPadding;
  children: React.ReactNode;
  className?: string;
}

const paddingMap: Record<SectionPadding, string> = {
  sm: '48px 0',
  md: '80px 0',
  lg: '120px 0',
};

const SectionWrapper = styled.section<{
  $variant: SectionVariant;
  $align: SectionAlign;
  $padding: SectionPadding;
}>`
  width: 100%;
  ${({ $padding }) => css`padding: ${paddingMap[$padding]};`}
  ${({ $variant }) => {
    switch ($variant) {
      case 'surface':
        return css`
          background: ${theme.colors.primary.surface};
          border-top: 1px solid rgb(45, 45, 48);
          border-bottom: 1px solid rgb(45, 45, 48);
        `;
      case 'transparent':
        return css`background: transparent;`;
      default:
        return css`background: ${theme.colors.primary.background};`;
    }
  }}
  text-align: ${({ $align }) => $align};
`;

const Inner = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.containerPadding};
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 16px;
  }
`;

const HeaderWrapper = styled.div<{ $align: SectionAlign }>`
  margin-bottom: ${theme.spacing.xl};
  text-align: ${({ $align }) => $align};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const ContentWrapper = styled.div``;

export const Section: React.FC<SectionProps> & {
  Header: React.FC<{ title?: string; subtitle?: string; align?: SectionAlign }>;
  Content: React.FC<{ children: React.ReactNode }>; 
  Grid: React.FC<{ children: React.ReactNode }>; 
} = ({
  id,
  variant = 'default',
  align = 'left',
  padding = 'md',
  children,
  className,
}) => {
  return (
    <SectionWrapper id={id} $variant={variant} $align={align} $padding={padding} className={className}>
      <Inner>{children}</Inner>
    </SectionWrapper>
  );
};

const SectionHeader: React.FC<{ title?: string; subtitle?: string; align?: SectionAlign }> = ({ title, subtitle, align = 'left' }) => (
  <HeaderWrapper $align={align}>
    {title && (
      <Typography variant="h2" color="white" align={align}>
        {title}
      </Typography>
    )}
    {subtitle && (
      <Typography variant="small" color="secondary" align={align}>
        {subtitle}
      </Typography>
    )}
  </HeaderWrapper>
);

SectionHeader.displayName = 'SectionHeader';

const SectionContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ContentWrapper>{children}</ContentWrapper>
);

SectionContent.displayName = 'SectionContent';

const SectionGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GridWrapper>{children}</GridWrapper>
);

SectionGrid.displayName = 'SectionGrid';

Section.Header = SectionHeader;
Section.Content = SectionContent;
Section.Grid = SectionGrid;

export default Section;


