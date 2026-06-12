/**
 * Theme Configuration
 * 3 switchable color schemes - comment/uncomment to switch
 */

// ============================================================
// SCHEME 1: Classic Navy + Gold (Original)
// ============================================================
/*
const scheme = {
  primary: {
    main: '#001f3f',
    dark: '#000d1f',
    light: '#003d7a',
  },
  accent: {
    main: '#FFD700',
    dark: '#DAA520',
    light: '#FFF8DC',
  },
  gradient: 'linear-gradient(135deg, #001f3f 0%, #000d1f 100%)',
  accentGradient: 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)',
};
*/

// ============================================================
// SCHEME 2: Modern Tech - Purple + Cyan
// ============================================================
/*
const scheme = {
  primary: {
    main: '#0f0f23',
    dark: '#0a0a1a',
    light: '#1a1a3e',
  },
  accent: {
    main: '#7c3aed',
    dark: '#6d28d9',
    light: '#c4b5fd',
    secondary: '#06b6d4',
    secondaryDark: '#0891b2',
  },
  gradient: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)',
  accentGradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
};
*/

// ============================================================
// SCHEME 3: Elegant Dark - Teal + Gold (ACTIVE)
// ============================================================
const scheme = {
  primary: {
    main: '#0d1117',
    dark: '#010409',
    light: '#161b22',
  },
  accent: {
    main: '#14b8a6',
    dark: '#0d9488',
    light: '#5eead4',
    secondary: '#fbbf24',
    secondaryDark: '#f59e0b',
  },
  gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
  accentGradient: 'linear-gradient(135deg, #14b8a6 0%, #fbbf24 100%)',
};

// ============================================================
// Color Configuration (DO NOT CHANGE - derived from scheme)
// ============================================================
export const colors = {
  primary: scheme.primary,
  accent: scheme.accent,
  gradient: scheme.gradient,
  accentGradient: scheme.accentGradient,

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

export const theme = {
  colors,
  spacing,
  fontSize,
  borderRadius,
  shadows,
};

export default theme;
