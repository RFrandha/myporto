'use client';

import React from 'react';
import { colors } from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated';
  style?: React.CSSProperties;
}

/**
 * Reusable card component with navy/gold theme
 */
export function Card({
  children,
  className = '',
  variant = 'default',
  style,
}: CardProps): React.ReactElement {
  const baseStyles =
    'rounded-lg transition-all duration-200 p-6';

  const variantStyles = {
    default: 'border border-gold/20',
    elevated: 'shadow-lg hover:shadow-xl',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{
        backgroundColor: colors.primary.main,
        borderColor: variant === 'default' ? colors.accent.main : undefined,
        color: colors.neutral.white,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
