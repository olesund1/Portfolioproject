import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
  className = '',
  showArrow = false,
  href,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all';
  
  const variantClasses = {
    primary: 'bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg',
    secondary: 'bg-secondary text-foreground hover:bg-muted border border-border',
    ghost: 'text-foreground hover:text-accent hover:bg-accent/5',
  };

  const sizeClasses = {
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {showArrow && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${classes} group`}>
      {children}
      {showArrow && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
    </button>
  );
}
