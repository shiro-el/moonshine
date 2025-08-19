export const theme = {
  // 색상 시스템
  colors: {
    primary: {
      background: 'rgb(8, 9, 10)',
      surface: 'rgb(20, 21, 22)',
      surfaceSecondary: 'rgb(35, 35, 38)',
      headerBackground: 'rgba(10, 10, 10, 0.8)',
    },
    text: {
      primary: 'rgb(247, 248, 248)',
      secondary: 'rgb(138, 143, 152)',
      tertiary: 'rgb(98, 102, 109)',
      white: 'rgb(255, 255, 255)',
    },
    surface: {
      primary: 'rgb(20, 21, 22)',
      secondary: 'rgb(35, 35, 38)',
    },
    border: 'rgb(45, 45, 48)',
    error: 'rgb(239, 68, 68)',
    success: 'rgb(34, 197, 94)',
    warning: 'rgb(245, 158, 11)',
    info: 'rgb(59, 130, 246)',
    palette: [
      'rgb(8, 9, 10)',
      'rgb(247, 248, 248)',
      'rgba(10, 10, 10, 0.8)',
      'rgb(138, 143, 152)',
      'rgb(20, 21, 22)',
      'rgb(35, 35, 38)',
      'rgb(98, 102, 109)',
      'rgb(255, 255, 255)',
    ],
  },

  // 타이포그래피
  typography: {
    fontFamily: {
      primary: '"Inter Variable", "SF Pro Display", -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    },
    headings: {
      h1: {
        fontSize: '64px',
        fontWeight: '510',
        lineHeight: '67.84px',
        letterSpacing: '-1.408px',
      },
      h2: {
        fontSize: '56px',
        fontWeight: '538',
        lineHeight: '61.6px',
        letterSpacing: '-1.82px',
      },
      h3: {
        fontSize: '21px',
        fontWeight: '510',
        lineHeight: '28px',
        letterSpacing: '-0.37px',
      },
      h4: {
        fontSize: '14px',
        fontWeight: '510',
        lineHeight: '24px',
        letterSpacing: '-0.182px',
      },
    },
    body: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
    },
    small: {
      fontSize: '13px',
      fontWeight: '510',
      lineHeight: '19.5px',
    },
    large: {
      fontSize: '17px',
      fontWeight: '510',
    },
  },

  // 간격
  spacing: {
    none: '0px',
    xs: '2px',
    sm: '6px',
    md: '12px',
    lg: '24px',
    xl: '48px',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '6px',
    md: '8px',
    lg: '30px',
  },

  // 트랜지션
  transitions: {
    fast: '0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    medium: '0.2s ease-out',
    slow: '0.24s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  // 컴포넌트별 스타일
  components: {
    button: {
      primary: {
        backgroundColor: 'rgb(35, 35, 38)',
        color: 'rgb(247, 248, 248)',
        border: 'none',
        borderRadius: '6px',
        padding: '2px 6px',
        fontSize: '16px',
        fontWeight: '400',
        transition: 'all 0.2s ease-out',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: 'rgb(138, 143, 152)',
        border: 'none',
        borderRadius: '8px',
        padding: '0px 12px',
        fontSize: '13px',
        fontWeight: '510',
        transition: 'color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      card: {
        backgroundColor: 'rgb(20, 21, 22)',
        color: 'rgb(247, 248, 248)',
        border: 'none',
        borderRadius: '30px',
        padding: '0px',
        fontSize: '16px',
        fontWeight: '400',
        transition: 'background 0.2s ease-out',
      },
    },
    link: {
      primary: {
        color: 'rgb(247, 248, 248)',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '400',
        transition: 'all 0.1s ease',
      },
      secondary: {
        color: 'rgb(138, 143, 152)',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: '510',
        transition: 'color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      white: {
        color: 'rgb(255, 255, 255)',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '510',
        transition: 'all 0.1s ease',
      },
    },
    header: {
      backgroundColor: 'rgba(10, 10, 10, 0.8)',
      color: 'rgb(247, 248, 248)',
      backdropFilter: 'blur(20px)',
    },
    navigation: {
      backgroundColor: 'transparent',
      color: 'rgb(247, 248, 248)',
    },
  },

  // 레이아웃
  layout: {
    maxWidth: '1200px',
    containerPadding: '0 24px',
    sectionPadding: '80px 0',
  },

  // 애니메이션
  animations: {
    hover: {
      scale: 'transform: scale(1.02)',
      fade: 'opacity: 0.8',
    },
    transition: {
      default: 'all 0.2s ease-out',
      color: 'color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      background: 'background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  // 이펙트
  effects: {
    blur: {
      backdrop: 'blur(20px)',
    },
    opacity: {
      overlay: '0.8',
      disabled: '0.6',
      hover: '0.8',
    },
  },
} as const;

// 테마 타입 추출
export type Theme = typeof theme;

// styled-components를 위한 타입 선언 확장
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
