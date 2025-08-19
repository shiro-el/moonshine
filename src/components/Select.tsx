'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/theme/theme';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

interface SelectContainerProps {
  $fullWidth: boolean;
}

interface SelectButtonProps {
  $variant: 'default' | 'filled' | 'outlined';
  $size: 'sm' | 'md' | 'lg';
  $hasError: boolean;
  $isOpen: boolean;
  $disabled: boolean;
}

const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  position: relative;
`;

const Label = styled.label`
  font-size: ${theme.typography.body.fontSize};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  display: block;
`;

const SelectButton = styled.button<SelectButtonProps>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: ${theme.typography.body.fontSize};
  line-height: 1.5;
  transition: ${theme.transitions.fast};
  background: transparent;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
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
  
  ${({ $variant, $hasError, $isOpen, $disabled }) => {
    if ($disabled) {
      return css`
        opacity: 0.6;
        cursor: not-allowed;
        color: ${theme.colors.text.tertiary};
      `;
    }
    
    switch ($variant) {
      case 'filled':
        return css`
          background: ${theme.colors.surface.secondary};
          border-radius: ${theme.borderRadius.md};
          border: 1px solid ${$hasError ? theme.colors.error : 'transparent'};
          color: ${$isOpen ? theme.colors.primary : theme.colors.text.primary};
          
          &:hover {
            background: ${theme.colors.surface.primary};
          }
        `;
      case 'outlined':
        return css`
          background: transparent;
          border-radius: ${theme.borderRadius.md};
          border: 1px solid ${$hasError ? theme.colors.error : theme.colors.border};
          color: ${$isOpen ? theme.colors.primary : theme.colors.text.primary};
          
          &:hover {
            border-color: ${theme.colors.primary};
          }
        `;
      default: // default
        return css`
          background: transparent;
          border-bottom: 2px solid ${$hasError ? theme.colors.error : theme.colors.border};
          color: ${$isOpen ? theme.colors.primary : theme.colors.text.primary};
          
          &:hover {
            border-bottom-color: ${theme.colors.primary};
          }
        `;
    }
  }}
`;

const SelectValue = styled.span<{ $hasValue: boolean }>`
  color: ${({ $hasValue }) => $hasValue ? 'inherit' : theme.colors.text.tertiary};
`;

const ChevronIcon = styled.svg<{ $isOpen: boolean }>`
  width: 16px;
  height: 16px;
  transition: transform ${theme.transitions.fast};
  transform: rotate(${({ $isOpen }) => $isOpen ? '180deg' : '0deg'});
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${theme.colors.surface.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transform: translateY(${({ $isOpen }) => $isOpen ? '0' : '-8px'});
  transition: all ${theme.transitions.fast};
`;

const Option = styled.button<{ $isSelected: boolean; $disabled: boolean }>`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  background: transparent;
  text-align: left;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  color: ${({ $isSelected, $disabled }) => {
    if ($disabled) return theme.colors.text.tertiary;
    if ($isSelected) return theme.colors.primary;
    return theme.colors.text.primary;
  }};
  font-weight: ${({ $isSelected }) => $isSelected ? 600 : 400};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  
  &:hover {
    background: ${({ $disabled }) => $disabled ? 'transparent' : theme.colors.surface.secondary};
  }
  
  &:first-child {
    border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${theme.borderRadius.md} ${theme.borderRadius.md};
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

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  placeholder = '선택해주세요',
  options,
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };
  
  return (
    <SelectContainer ref={containerRef} $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <SelectButton
        type="button"
        onClick={handleToggle}
        $variant={variant}
        $size={size}
        $hasError={!!error}
        $isOpen={isOpen}
        $disabled={disabled}
      >
        <SelectValue $hasValue={!!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </SelectValue>
        <ChevronIcon $isOpen={isOpen} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </ChevronIcon>
      </SelectButton>
      
      <Dropdown $isOpen={isOpen}>
        {options.map((option) => (
          <Option
            key={option.value}
            onClick={() => !option.disabled && handleSelect(option.value)}
            $isSelected={option.value === value}
            $disabled={option.disabled || false}
          >
            {option.label}
          </Option>
        ))}
      </Dropdown>
      
      {error && <ErrorText>{error}</ErrorText>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </SelectContainer>
  );
};

export default Select;
