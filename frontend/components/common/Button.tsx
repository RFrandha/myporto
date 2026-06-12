'use client';

import React from 'react';
import { colors } from '@/styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps): React.ReactElement {
  const baseStyles = `font-semibold rounded-lg transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: {
      background: colors.accentGradient,
      color: colors.primary.dark,
    },
    outline: {
      background: 'transparent',
      color: colors.accent.main,
      border: `2px solid ${colors.accent.main}`,
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </button>
  );
}
