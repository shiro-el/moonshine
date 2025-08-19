'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

type ButtonVariant = 'primary' | 'secondary' | 'card';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $loading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily.primary};
  transition: ${theme.transitions.medium};
  position: relative;
  min-height: 40px;
  
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  ${({ $loading }) => $loading && css`
    pointer-events: none;
    opacity: ${theme.effects.opacity.disabled};
  `}

  // 버튼 변형별 스타일
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background-color: ${theme.components.button.primary.backgroundColor};
          color: ${theme.components.button.primary.color};
          border-radius: ${theme.components.button.primary.borderRadius};
          font-size: ${theme.components.button.primary.fontSize};
          font-weight: ${theme.components.button.primary.fontWeight};
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          
          &:hover:not(:disabled) {
            background-color: rgb(45, 45, 48);
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.components.button.secondary.backgroundColor};
          color: ${theme.components.button.secondary.color};
          border-radius: ${theme.components.button.secondary.borderRadius};
          font-size: ${theme.components.button.secondary.fontSize};
          font-weight: ${theme.components.button.secondary.fontWeight};
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          border: 1px solid ${theme.colors.primary.surfaceSecondary};
          
          &:hover:not(:disabled) {
            color: ${theme.colors.text.primary};
            background-color: ${theme.colors.primary.surfaceSecondary};
          }
        `;
      case 'card':
        return css`
          background-color: ${theme.components.button.card.backgroundColor};
          color: ${theme.components.button.card.color};
          border-radius: ${theme.components.button.card.borderRadius};
          font-size: ${theme.components.button.card.fontSize};
          font-weight: ${theme.components.button.card.fontWeight};
          padding: ${theme.spacing.lg};
          min-height: 80px;
          
          &:hover:not(:disabled) {
            background-color: rgb(30, 31, 32);
            transform: scale(1.02);
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
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          min-height: 32px;
        `;
      case 'lg':
        return css`
          font-size: ${theme.typography.large.fontSize};
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          min-height: 48px;
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    opacity: ${theme.effects.opacity.disabled};
    cursor: not-allowed;
    transform: none !important;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${theme.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  loading,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};

export default Button;
