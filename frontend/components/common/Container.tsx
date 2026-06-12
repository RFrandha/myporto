import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * Centered container wrapper
 */
export function Container({
  children,
  className = '',
  maxWidth = 'xl',
}: ContainerProps): React.ReactElement {
  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
  };

  return (
    <div
      className={`mx-auto px-4 w-full ${maxWidthStyles[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
}
