import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Star, Heart } from 'lucide-react';
import { Movie } from '../types/movie.types';
import { Badge } from '../../../components/ui/Badge';

export interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Khởi tạo trạng thái Yêu Thích từ localStorage (Optimistic Persistence)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cyber_favorites');
      if (saved) {
        const ids: (string | number)[] = JSON.parse(saved);
        setIsFavorited(ids.includes(movie.id));
      }
    } catch {
      // Bỏ qua lỗi parse
    }
  }, [movie.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const saved = localStorage.getItem('cyber_favorites');
      let ids: (string | number)[] = saved ? JSON.parse(saved) : [];
      const newStatus = !isFavorited;

      if (newStatus) {
        if (!ids.includes(movie.id)) ids.push(movie.id);
        setShowToast('Đã lưu vào danh sách Yêu Thích ❤️');
      } else {
        ids = ids.filter((id) => id !== movie.id);
        setShowToast('Đã xóa khỏi danh sách Yêu Thích');
      }

      localStorage.setItem('cyber_favorites', JSON.stringify(ids));
      setIsFavorited(newStatus);

      setTimeout(() => setShowToast(null), 2200);
    } catch (err) {
      console.error('Failed to update favorites:', err);
    }
  };

  const handleQuickPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/watch/${movie.slug}`);
  };

  // Chuẩn hóa tên chất lượng hiển thị
  const qualityLabel =
    movie.quality === 'FOUR_K' ? '4K Ultra' : movie.quality === 'FULL_HD' ? 'FHD' : 'HD';

  return (
    <Link
      to={`/movies/${movie.slug}`}
      className={`group rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF]/60 dark:hover:border-[#00F0FF]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,240,255,0.22)] flex flex-col relative select-none ${className}`}
    >
      {/* Toast thông báo nhanh khi bấm yêu thích */}
      {showToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-[#070913]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.4)] backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
          {showToast}
        </div>
      )}

      {/* Khung Poster tỷ lệ 2:3 */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-900">
        <img
          src={movie.posterUrl || movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            // Fallback khi ảnh bị lỗi link
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('placeholder')) {
              target.src =
                'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80';
            }
          }}
        />

        {/* Lớp phủ Gradient điện ảnh */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 group-hover:from-black/90 group-hover:via-black/40 transition-colors" />

        {/* Badges góc trên bên trái: 4K/FHD + VIP Exclusive */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <Badge variant="quality" className="backdrop-blur-xs font-black">
            {qualityLabel}
          </Badge>
          {movie.isVip && (
            <Badge variant="vip" className="font-black">
              VIP
            </Badge>
          )}
        </div>

        {/* Cụm góc trên bên phải: Rating sao + Nút Yêu thích (Heart) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
          <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15 text-[10px] text-[#FFEE00] font-black flex items-center gap-1 shadow-xs">
            <Star size={11} className="fill-[#FFEE00]" /> {movie.rating}
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={isFavorited ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
            className={`w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
              isFavorited
                ? 'bg-rose-500/25 text-rose-500 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.4)] opacity-100'
                : 'bg-black/50 text-white/80 hover:text-rose-400 border border-white/15 hover:border-rose-400/50 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart
              size={14}
              className={`transition-colors ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Lớp phủ Quick Action: Nút Xem Nhanh ở trung tâm */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <button
            type="button"
            onClick={handleQuickPlay}
            aria-label="Xem phim ngay"
            className="w-13 h-13 rounded-full bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] flex items-center justify-center shadow-[0_0_22px_#00F0FF] scale-90 group-hover:scale-100 hover:scale-110 active:scale-95 transition-all cursor-pointer pointer-events-auto"
          >
            <Play size={22} className="fill-current ml-1" />
          </button>
          <span className="text-[11px] font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none">
            Xem Nhanh
          </span>
        </div>

        {/* Nhãn loại phim ở mép đáy poster */}
        <div className="absolute bottom-2 left-2.5 z-10">
          <span className="text-[10px] font-semibold text-slate-300/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
            {movie.movieType === 'SINGLE'
              ? 'Phim Lẻ'
              : movie.totalEpisodes
              ? `${movie.totalEpisodes} Tập`
              : 'Phim Bộ'}
          </span>
        </div>
      </div>

      {/* Thông tin phim bên dưới poster */}
      <div className="p-3.5 flex flex-col justify-between flex-1 gap-1.5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00A6FF] dark:group-hover:text-[#00F0FF] transition-colors line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-medium">{movie.releaseYear}</span>
          <span className="text-slate-600 dark:text-slate-500">•</span>
          <span className="truncate max-w-[120px] sm:max-w-[140px] text-slate-400">
            {movie.genres.slice(0, 2).join(', ')}
          </span>
        </div>
      </div>
    </Link>
  );
};
