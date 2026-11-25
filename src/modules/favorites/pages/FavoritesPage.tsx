import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2, Sparkles, Film } from 'lucide-react';
import { movieService } from '../../movies/services/movieService';
import { Movie } from '../../movies/types/movie.types';
import { MovieCard } from '../../movies/components/MovieCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Button } from '../../../components/ui/Button';
import { showToast, showConfirmDialog } from '../../../utils/alert';

export const FavoritesPage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const res = await movieService.getMovies();
      const allMovies = res.movies || [];
      const saved = localStorage.getItem('cyber_favorites');
      if (saved) {
        const ids: (string | number)[] = JSON.parse(saved);
        const filtered = allMovies.filter((m: Movie) => ids.includes(m.id));
        setFavoriteMovies(filtered);
      } else {
        setFavoriteMovies([]);
      }
    } catch {
      setFavoriteMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();

    // Lắng nghe sự kiện storage nếu thay đổi ở tab khác
    const handleStorageChange = () => loadFavorites();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClearAll = async () => {
    if (favoriteMovies.length === 0) return;

    const res = await showConfirmDialog({
      title: 'Xóa Toàn Bộ Phim Yêu Thích?',
      text: 'Toàn bộ danh sách phim bạn đã lưu sẽ bị gỡ bỏ khỏi bộ sưu tập. Hành động này không thể hoàn tác.',
      confirmText: 'Xóa Hết',
      cancelText: 'Giữ Lại',
      icon: 'warning',
    });

    if (res.isConfirmed) {
      localStorage.removeItem('cyber_favorites');
      setFavoriteMovies([]);
      showToast.success('Đã xóa sạch danh sách phim yêu thích!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Thanh Điều Hướng & Tiêu Đề */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-[#162038] pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              to="/"
              className="hover:text-slate-900 dark:hover:text-[#00F0FF] transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Trang Chủ
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold">Phim Yêu Thích</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              <Heart size={20} className="fill-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Bộ Sưu Tập Yêu Thích
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Tổng cộng {favoriteMovies.length} bộ phim được lưu trong danh sách cá nhân
              </p>
            </div>
          </div>
        </div>

        {/* Nút Thao Tác Nhanh */}
        {favoriteMovies.length > 0 && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="min-h-[40px] px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Trash2 size={14} />
              <span>Xóa Tất Cả</span>
            </Button>
            <Link to="/movies">
              <Button
                variant="primary"
                className="min-h-[40px] px-4 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                <Sparkles size={14} className="mr-1.5" />
                <span>Khám Phá Thêm</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Nội Dung: Danh Sách Hoặc Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 rounded-2xl bg-slate-200 dark:bg-slate-800/60 animate-pulse border border-slate-300 dark:border-slate-700/40"
            />
          ))}
        </div>
      ) : favoriteMovies.length === 0 ? (
        <EmptyState
          icon={<Heart size={38} className="text-rose-500 fill-rose-500/20 animate-pulse" />}
          title="Chưa Có Phim Yêu Thích Nào"
          description="Kho phim điện ảnh bom tấn và anime đỉnh cao đang chờ đón bạn. Hãy nhấn vào biểu tượng trái tim trên bất kỳ bộ phim nào để lưu lại danh sách cá nhân!"
          actionLabel="Khám Phá Phim Ngay"
          linkTo="/movies"
          secondaryLabel="Về Trang Chủ"
          secondaryLinkTo="/"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
