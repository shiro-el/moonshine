'use client';

import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface InputContainerProps {
  $fullWidth: boolean;
}

interface StyledInputProps {
  $variant: 'default' | 'filled' | 'outlined';
  $size: 'sm' | 'md' | 'lg';
  $hasError: boolean;
  $hasStartIcon: boolean;
  $hasEndIcon: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  font-size: ${theme.typography.body.fontSize};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: ${theme.typography.body.fontSize};
  line-height: 1.5;
  transition: ${theme.transitions.fast};
  background: transparent;
  color: ${theme.colors.text.white};
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          height: 36px;
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          height: 52px;
        `;
      default: // md
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          height: 44px;
        `;
    }
  }}
  
  ${({ $variant, $hasError }) => {
    switch ($variant) {
      case 'filled':
        return css`
          background: ${theme.colors.surface.secondary};
          border-radius: ${theme.borderRadius.md};
          border: 1px solid ${$hasError ? theme.colors.error : 'transparent'};
          
          &:focus {
            background: ${theme.colors.surface.primary};
            border-color: ${theme.colors.primary};
          }
          
          &:hover {
            background: ${theme.colors.surface.primary};
          }
        `;
      case 'outlined':
        return css`
          background: transparent;
          border-radius: ${theme.borderRadius.md};
          border: 1px solid ${$hasError ? theme.colors.error : theme.colors.border};
          
          &:focus {
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 2px ${theme.colors.primary}20;
          }
          
          &:hover {
            border-color: ${theme.colors.primary};
          }
        `;
      default: // default
        return css`
          background: transparent;
          border-bottom: 2px solid ${$hasError ? theme.colors.error : theme.colors.border};
          
          &:focus {
            border-bottom-color: ${theme.colors.primary};
          }
          
          &:hover {
            border-bottom-color: ${theme.colors.primary};
          }
        `;
    }
  }}
  
  ${({ $hasStartIcon }) => $hasStartIcon && css`
    padding-left: 44px;
  `}
  
  ${({ $hasEndIcon }) => $hasEndIcon && css`
    padding-right: 44px;
  `}
  
  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ $position: 'start' | 'end' }>`
  position: absolute;
  ${({ $position }) => $position === 'start' ? 'left' : 'right'}: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  pointer-events: none;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ErrorText = styled.span`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
`;

const HelperText = styled.span`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.text.tertiary};
  margin-top: ${theme.spacing.xs};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    variant = 'default', 
    size = 'md', 
    fullWidth = false,
    startIcon,
    endIcon,
    ...props 
  }, ref) => {
    return (
      <InputContainer $fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputWrapper>
          {startIcon && (
            <IconWrapper $position="start">
              {startIcon}
            </IconWrapper>
          )}
          <StyledInput
            ref={ref}
            $variant={variant}
            $size={size}
            $hasError={!!error}
            $hasStartIcon={!!startIcon}
            $hasEndIcon={!!endIcon}
            {...props}
          />
          {endIcon && (
            <IconWrapper $position="end">
              {endIcon}
            </IconWrapper>
          )}
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;
