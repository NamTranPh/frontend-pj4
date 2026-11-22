import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Movie } from '../types/movie.types';
import { Badge } from '../../../components/ui/Badge';

export interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie.slug}`}
      className="group rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_22px_rgba(0,240,255,0.4)] flex flex-col relative"
    >
      {/* Khung Poster tỷ lệ 2:3 */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={movie.posterUrl || movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Lớp phủ tối mờ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Badges góc trên */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <Badge variant="quality">{movie.quality}</Badge>
          {movie.isVip && <Badge variant="vip">VIP</Badge>}
        </div>

        {/* Đánh giá sao */}
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20 text-[10px] text-[#FFEE00] font-black flex items-center gap-1">
          <Star size={11} className="fill-[#FFEE00]" /> {movie.rating}
        </div>

        {/* Nút Play phát sáng xuất hiện khi hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div className="w-12 h-12 rounded-full bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] flex items-center justify-center shadow-[0_0_20px_#00F0FF] scale-90 group-hover:scale-100 transition-transform">
            <Play size={20} className="fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Thông tin phim */}
      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00A6FF] dark:group-hover:text-[#00F0FF] transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span className="line-clamp-1">{movie.genres.slice(0, 2).join(', ')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
