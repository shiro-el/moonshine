'use client';

import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
}

interface TextareaContainerProps {
  $fullWidth: boolean;
}

interface StyledTextareaProps {
  $variant: 'default' | 'filled' | 'outlined';
  $size: 'sm' | 'md' | 'lg';
  $hasError: boolean;
}

const TextareaContainer = styled.div<TextareaContainerProps>`
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

const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: ${theme.typography.body.fontSize};
  line-height: 1.6;
  transition: ${theme.transitions.fast};
  background: transparent;
  color: ${theme.colors.text.white};
  resize: vertical;
  min-height: 100px;
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          min-height: 80px;
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          min-height: 120px;
        `;
      default: // md
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          min-height: 100px;
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
  
  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

const CharacterCount = styled.span<{ $isOverLimit: boolean }>`
  font-size: ${theme.typography.small.fontSize};
  color: ${({ $isOverLimit }) => $isOverLimit ? theme.colors.error : theme.colors.text.tertiary};
  margin-top: ${theme.spacing.xs};
  text-align: right;
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    variant = 'default', 
    size = 'md', 
    fullWidth = false,
    rows = 4,
    maxLength,
    showCharacterCount = false,
    ...props 
  }, ref) => {
    const [characterCount, setCharacterCount] = React.useState(0);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacterCount(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };
    
    const isOverLimit = maxLength ? characterCount > maxLength : false;
    
    return (
      <TextareaContainer $fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <StyledTextarea
          ref={ref}
          $variant={variant}
          $size={size}
          $hasError={!!error}
          rows={rows}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
        {showCharacterCount && maxLength && (
          <CharacterCount $isOverLimit={isOverLimit}>
            {characterCount} / {maxLength}
          </CharacterCount>
        )}
      </TextareaContainer>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
