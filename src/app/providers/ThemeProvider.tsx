'use client';

import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '@/theme/theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.primary.background};
    color: ${theme.colors.text.primary};
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.body.fontSize};
    line-height: ${theme.typography.body.lineHeight};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  // 스크롤바 스타일링
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.primary.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.surfaceSecondary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(55, 55, 58);
  }

  // 선택 영역 스타일링
  ::selection {
    background-color: ${theme.colors.primary.surfaceSecondary};
    color: ${theme.colors.text.primary};
  }

  // 포커스 상태 스타일링
  *:focus {
    outline: 2px solid ${theme.colors.primary.surfaceSecondary};
    outline-offset: 2px;
  }

  // 버튼과 입력 요소의 기본 스타일 초기화
  button, input, textarea, select {
    font-family: inherit;
  }

  // 링크 기본 스타일
  a {
    color: inherit;
    text-decoration: none;
  }

  // 이미지 기본 스타일
  img {
    max-width: 100%;
    height: auto;
  }
`;

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
