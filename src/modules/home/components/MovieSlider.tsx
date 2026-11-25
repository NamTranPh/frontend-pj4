import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../../movies/types/movie.types';
import { MovieCard } from '../../movies/components/MovieCard';

interface MovieSliderProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  badgeColor?: 'cyan' | 'magenta' | 'yellow';
}

export const MovieSlider: React.FC<MovieSliderProps> = ({
  title,
  subtitle,
  movies,
  badgeColor = 'cyan',
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const dotColorClass =
    badgeColor === 'magenta'
      ? 'bg-[#E100FF] shadow-[0_0_8px_#E100FF]'
      : badgeColor === 'yellow'
      ? 'bg-[#FFEE00] shadow-[0_0_8px_#FFEE00]'
      : 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]';

  return (
    <section className="py-4 space-y-4">
      {/* Header Hàng phim */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>{title}</span>
            <span className={`w-2 h-2 rounded-full ${dotColorClass}`} />
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{subtitle}</p>
          )}
        </div>

        {/* Nút lướt Trái / Phải */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-[#0d1224] hover:bg-[#00A6FF] dark:hover:bg-[#00F0FF] text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-black border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Cuộn trái"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-[#0d1224] hover:bg-[#00A6FF] dark:hover:bg-[#00F0FF] text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-black border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Cuộn phải"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Row Danh Sách Card Phim Tái Sử Dụng MovieCard Chuẩn DRY */}
      <div
        ref={rowRef}
        className="flex items-stretch gap-3.5 sm:gap-4.5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 pt-1 scrollbar-none scroll-smooth"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0 w-38 sm:w-46 md:w-50 lg:w-54">
            <MovieCard movie={movie} className="h-full" />
          </div>
        ))}
      </div>
    </section>
  );
};
