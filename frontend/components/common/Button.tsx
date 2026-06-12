'use client';

import React from 'react';
import { colors } from '@/styles/theme';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Reusable button component with gold accent
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const baseStyles =
    'font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: `bg-gold text-navy hover:bg-darkGold focus:ring-gold`,
    secondary: `bg-navy text-white hover:bg-lightNavy focus:ring-gold`,
    outline: `border-2 border-gold text-gold hover:bg-gold/10 focus:ring-gold`,
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      style={{
        backgroundColor:
          variant === 'primary' ? colors.accent.gold : undefined,
        borderColor: variant === 'outline' ? colors.accent.gold : undefined,
        color:
          variant === 'primary'
            ? colors.primary.navy
            : variant === 'outline'
              ? colors.accent.gold
              : colors.neutral.white,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
