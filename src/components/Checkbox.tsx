'use client';

import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'checkbox' | 'radio';
  type?: 'checkbox' | 'radio';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  indeterminate?: boolean;
}

interface CheckboxContainerProps {
  $fullWidth: boolean;
  $disabled: boolean;
}

interface CheckboxWrapperProps {
  $size: 'sm' | 'md' | 'lg';
  $checked: boolean;
  $indeterminate: boolean;
  $disabled: boolean;
  $variant: 'checkbox' | 'radio';
}

const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid ${theme.colors.border};
  background: transparent;
  transition: ${theme.transitions.fast};
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          width: 16px;
          height: 16px;
        `;
      case 'lg':
        return css`
          width: 24px;
          height: 24px;
        `;
      default: // md
        return css`
          width: 20px;
          height: 20px;
        `;
    }
  }}
  
  ${({ $variant }) => {
    if ($variant === 'radio') {
      return css`
        border-radius: 50%;
      `;
    }
    return css`
      border-radius: ${theme.borderRadius.sm};
    `;
  }}
  
  ${({ $checked, $indeterminate, $disabled }) => {
    if ($disabled) {
      return css`
        border-color: ${theme.colors.text.tertiary};
        background: ${theme.colors.surface.secondary};
      `;
    }
    
    if ($checked || $indeterminate) {
      return css`
        border-color: ${theme.colors.primary};
        background: ${theme.colors.primary};
      `;
    }
    
    return css`
      &:hover {
        border-color: ${theme.colors.primary};
      }
    `;
  }}
`;

const CheckIcon = styled.svg<{ $size: 'sm' | 'md' | 'lg' }>`
  width: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '8px';
      case 'lg': return '14px';
      default: return '12px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '8px';
      case 'lg': return '14px';
      default: return '12px';
    }
  }};
  fill: ${theme.colors.text.white};
`;

const IndeterminateIcon = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  width: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '8px';
      case 'lg': return '14px';
      default: return '12px';
    }
  }};
  height: 2px;
  background: ${theme.colors.text.white};
  border-radius: 1px;
`;

const RadioIcon = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  width: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '6px';
      case 'lg': return '10px';
      default: return '8px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '6px';
      case 'lg': return '10px';
      default: return '8px';
    }
  }};
  background: ${theme.colors.text.white};
  border-radius: 50%;
`;

const Label = styled.label<{ $disabled: boolean }>`
  font-size: ${theme.typography.body.fontSize};
  color: ${({ $disabled }) => $disabled ? theme.colors.text.tertiary : theme.colors.text.primary};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  line-height: 1.4;
  flex: 1;
`;

const ErrorText = styled.span`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
  display: block;
`;

const HelperText = styled.span`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.text.tertiary};
  margin-top: ${theme.spacing.xs};
  display: block;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    error, 
    helperText, 
    variant = 'checkbox', 
    type,
    size = 'md', 
    fullWidth = false,
    indeterminate = false,
    disabled = false,
    checked,
    onChange,
    ...props 
  }, ref) => {
    const handleClick = () => {
      if (!disabled && onChange) {
        const event = {
          target: {
            checked: !checked,
            type: type || variant,
            ...props
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div>
        <CheckboxContainer 
          $fullWidth={fullWidth} 
          $disabled={disabled}
          onClick={handleClick}
        >
          <HiddenInput
            ref={ref}
            type={type || variant}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...props}
          />
          <CheckboxWrapper
            $size={size}
            $checked={!!checked}
            $indeterminate={indeterminate}
            $disabled={disabled}
            $variant={variant}
          >
            {variant === 'checkbox' ? (
              <>
                {checked && !indeterminate && (
                  <CheckIcon $size={size} viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </CheckIcon>
                )}
                {indeterminate && (
                  <IndeterminateIcon $size={size} />
                )}
              </>
            ) : (
              checked && <RadioIcon $size={size} />
            )}
          </CheckboxWrapper>
          {label && (
            <TextContainer>
              <Label $disabled={disabled}>{label}</Label>
              {error && <ErrorText>{error}</ErrorText>}
              {helperText && !error && <HelperText>{helperText}</HelperText>}
            </TextContainer>
          )}
        </CheckboxContainer>
        {!label && error && <ErrorText>{error}</ErrorText>}
        {!label && helperText && !error && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;