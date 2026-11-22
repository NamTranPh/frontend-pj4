import React from 'react';

export interface BadgeProps {
  variant?: 'vip' | 'quality' | 'type' | 'rating' | 'cyan' | 'magenta' | 'yellow';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'cyan', children, className = '' }) => {
  const variantStyles = {
    vip: 'bg-[#FFEE00] text-[#070913] font-black shadow-[0_0_10px_rgba(255,238,0,0.4)]',
    quality: 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_8px_rgba(0,240,255,0.25)] font-bold',
    type: 'bg-[#9D00FF]/15 text-[#9D00FF] border border-[#9D00FF]/40 font-semibold',
    rating: 'bg-black/60 text-[#FFEE00] border border-[#FFEE00]/40 font-black',
    cyan: 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold',
    magenta: 'bg-[#E100FF]/15 text-[#E100FF] border border-[#E100FF]/30 font-semibold',
    yellow: 'bg-[#FFEE00]/15 text-[#FFEE00] border border-[#FFEE00]/30 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
