'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/theme/theme';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  layout?: 'vertical' | 'horizontal' | 'grid';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

interface FormContainerProps {
  $layout: 'vertical' | 'horizontal' | 'grid';
  $gap: 'sm' | 'md' | 'lg' | 'xl';
  $fullWidth: boolean;
}

const FormContainer = styled.form<FormContainerProps>`
  display: flex;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  
  ${({ $layout, $gap }) => {
    const gapValue = theme.spacing[$gap];
    
    switch ($layout) {
      case 'horizontal':
        return `
          flex-direction: row;
          align-items: flex-end;
          gap: ${gapValue};
          flex-wrap: wrap;
        `;
      case 'grid':
        return `
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: ${gapValue};
        `;
      default: // vertical
        return `
          flex-direction: column;
          gap: ${gapValue};
        `;
    }
  }}
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FormTitle = styled.h2`
  font-size: ${theme.typography.headings.h2.fontSize};
  font-weight: ${theme.typography.headings.h2.fontWeight};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.4;
  word-break: keep-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const FormSubtitle = styled.p`
  font-size: ${theme.typography.body.fontSize};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
  word-break: keep-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const FormDivider = styled.hr`
  border: none;
  height: 1px;
  background: ${theme.colors.border};
  margin: ${theme.spacing.lg} 0;
`;

export const Form: React.FC<FormProps> & {
  Section: typeof FormSection;
  Row: typeof FormRow;
  Actions: typeof FormActions;
  Title: typeof FormTitle;
  Subtitle: typeof FormSubtitle;
  Divider: typeof FormDivider;
} = ({ 
  children, 
  onSubmit, 
  layout = 'vertical', 
  gap = 'lg', 
  fullWidth = false,
  ...props 
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      $layout={layout}
      $gap={gap}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </FormContainer>
  );
};

Form.Section = FormSection;
Form.Row = FormRow;
Form.Actions = FormActions;
Form.Title = FormTitle;
Form.Subtitle = FormSubtitle;
Form.Divider = FormDivider;

export default Form;
