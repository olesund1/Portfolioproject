import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
  
  const variantClasses = {
    default: 'bg-secondary text-foreground',
    accent: 'bg-accent/10 text-accent border border-accent/20',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
