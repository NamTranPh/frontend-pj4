import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ref,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] rounded-xl';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-linear-to-r from-[#00F0FF] to-[#00A6FF] text-[#070913] hover:from-[#52f6ff] hover:to-[#38b9ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]',
    glow:
      'bg-[#00F0FF] text-[#070913] font-black uppercase tracking-wider shadow-[0_0_20px_#00F0FF] hover:shadow-[0_0_35px_#00F0FF] hover:scale-105',
    secondary:
      'bg-[#0d1224] text-slate-200 border border-[#162038] hover:border-[#00F0FF]/40 hover:text-[#00F0FF] shadow-sm',
    outline:
      'bg-transparent text-[#00F0FF] border-2 border-[#00F0FF] hover:bg-[#00F0FF]/10 shadow-[0_0_10px_rgba(0,240,255,0.2)]',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/10',
    danger:
      'bg-linear-to-r from-rose-600 to-rose-700 text-white hover:from-rose-500 hover:to-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
