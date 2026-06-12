/**
 * Theme Configuration
 * Navy + Gold color scheme for MyPorto portfolio
 */

export const colors = {
  // Primary Colors (Navy)
  primary: {
    navy: '#001f3f',        // Deep navy - main background
    darkNavy: '#000d1f',    // Darker navy - contrast
    lightNavy: '#003d7a',   // Lighter navy - hover states
  },

  // Accent Colors (Gold)
  accent: {
    gold: '#FFD700',        // Main gold accent
    darkGold: '#DAA520',    // Dark gold for hover
    lightGold: '#FFF8DC',   // Light gold - backgrounds
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F9F9F9',
    lightGray: '#E0E0E0',
    gray: '#808080',
    darkGray: '#333333',
    black: '#000000',
  },

  // Status Colors
  status: {
    success: '#00AA00',
    error: '#FF4444',
    warning: '#FFAA00',
    info: '#0099CC',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

// Dark mode configuration
export const darkModeConfig = {
  background: colors.primary.darkNavy,
  foreground: colors.neutral.white,
  border: colors.primary.navy,
  hoverBg: colors.primary.lightNavy,
  accent: colors.accent.gold,
  accentHover: colors.accent.darkGold,
};

// Light mode configuration (for future)
export const lightModeConfig = {
  background: colors.neutral.white,
  foreground: colors.primary.darkNavy,
  border: colors.neutral.lightGray,
  hoverBg: colors.neutral.offWhite,
  accent: colors.accent.darkGold,
  accentHover: colors.accent.gold,
};

export const theme = {
  colors,
  spacing,
  fontSize,
  borderRadius,
  shadows,
  dark: darkModeConfig,
  light: lightModeConfig,
};

export default theme;
