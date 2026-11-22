import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { Movie } from '../../movies/types/movie.types';
import { Badge } from '../../../components/ui/Badge';

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
      const scrollAmount = direction === 'left' ? -400 : 400;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 space-y-4">
      {/* Header Hàng phim */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>{title}</span>
            <span
              className={`w-2 h-2 rounded-full ${
                badgeColor === 'magenta'
                  ? 'bg-[#E100FF] shadow-[0_0_8px_#E100FF]'
                  : badgeColor === 'yellow'
                  ? 'bg-[#FFEE00] shadow-[0_0_8px_#FFEE00]'
                  : 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]'
              }`}
            />
          </h2>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Nút lướt Trái / Phải */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#0d1224] hover:bg-[#00A6FF] dark:hover:bg-[#00F0FF] text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-black border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Cuộn trái"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#0d1224] hover:bg-[#00A6FF] dark:hover:bg-[#00F0FF] text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-black border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Cuộn phải"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Row Danh Sách Card Phim */}
      <div
        ref={rowRef}
        className="flex items-center gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scrollbar-none scroll-smooth"
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.slug}`}
            className="group shrink-0 w-44 sm:w-52 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] relative flex flex-col"
          >
            {/* Poster Khung Ảnh Tỷ Lệ 2:3 */}
            <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img
                src={movie.posterUrl || movie.backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Lớp phủ tối mờ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Badges góc trên */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <Badge variant="quality">{movie.quality}</Badge>
                {movie.isVip && <Badge variant="vip">VIP</Badge>}
              </div>

              {/* Rating sao */}
              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20 text-[10px] text-[#FFEE00] font-black flex items-center gap-1">
                <Star size={11} className="fill-[#FFEE00]" /> {movie.rating}
              </div>

              {/* Nút Play phát sáng xuất hiện khi hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                <div className="w-12 h-12 rounded-full bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] flex items-center justify-center shadow-[0_0_20px_#00F0FF] scale-90 group-hover:scale-100 transition-transform">
                  <Play size={20} className="fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Thông tin ở đáy Card */}
            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00A6FF] dark:group-hover:text-[#00F0FF] transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{movie.releaseYear}</span>
                  <span>•</span>
                  <span>{movie.genres[0] || 'Phim'}</span>
                  <span>•</span>
                  <span>{movie.movieType === 'SINGLE' ? 'Lẻ' : 'Bộ'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
