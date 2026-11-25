import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: React.ReactNode | LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  linkTo?: string;
  secondaryLabel?: string;
  secondaryLinkTo?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  linkTo,
  secondaryLabel,
  secondaryLinkTo,
  className = '',
}) => {
  return (
    <div
      className={`w-full py-16 px-6 sm:px-10 rounded-3xl bg-white/70 dark:bg-[#0d1224]/80 backdrop-blur-xl border border-slate-200/80 dark:border-[#162038] text-center flex flex-col items-center justify-center gap-5 shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Halo Avatar Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-linear-to-b from-[#00F0FF]/15 to-transparent border border-[#00A6FF]/30 dark:border-[#00F0FF]/30 flex items-center justify-center text-[#00A6FF] dark:text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.25)]">
          {React.isValidElement(icon) ? (
            icon
          ) : (
            React.createElement(icon as React.ComponentType<{ size?: number; className?: string }>, {
              size: 38,
              className: 'animate-pulse',
            })
          )}
        </div>
        <div className="absolute -inset-2 rounded-3xl bg-[#00F0FF]/10 blur-xl -z-10 pointer-events-none" />
      </div>

      {/* Typography Hierarchy */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(actionLabel || secondaryLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actionLabel &&
            (linkTo ? (
              <Link to={linkTo}>
                <Button
                  variant="primary"
                  className="min-h-[44px] px-6 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.55)] cursor-pointer"
                >
                  {actionLabel}
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                onClick={onAction}
                className="min-h-[44px] px-6 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.55)] cursor-pointer"
              >
                {actionLabel}
              </Button>
            ))}

          {secondaryLabel && secondaryLinkTo && (
            <Link to={secondaryLinkTo}>
              <Button
                variant="outline"
                className="min-h-[44px] px-5 text-xs sm:text-sm font-medium border-slate-200 dark:border-[#162038] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
              >
                {secondaryLabel}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
