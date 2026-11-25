import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Star,
  Calendar,
  Clock,
  Heart,
  Share2,
  Film,
  Check,
  ArrowLeft,
  User,
  Sparkles,
  Layers,
} from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie.types';
import { MovieCard } from '../components/MovieCard';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const MovieDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await movieService.getMovieBySlug(slug);
        setMovie(data);

        // Nạp danh sách phim đề cử cùng thể loại
        if (data) {
          const related = await movieService.getMovies({
            genre: data.genres[0] || undefined,
          });
          setRelatedMovies(
            related.movies.filter((m) => m.id !== data.id).slice(0, 6)
          );
        }
      } catch (err) {
        console.error('Error fetching movie detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  // Đồng bộ trạng thái Yêu thích
  useEffect(() => {
    if (movie) {
      try {
        const saved = localStorage.getItem('cyber_favorites');
        if (saved) {
          const ids: (string | number)[] = JSON.parse(saved);
          setIsFavorite(ids.includes(movie.id));
        }
      } catch {
        // Bỏ qua lỗi
      }
    }
  }, [movie]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Đã sao chép liên kết chia sẻ phim!');
  };

  const handleToggleFavorite = () => {
    if (!movie) return;
    try {
      const saved = localStorage.getItem('cyber_favorites');
      let ids: (string | number)[] = saved ? JSON.parse(saved) : [];
      const newStatus = !isFavorite;

      if (newStatus) {
        if (!ids.includes(movie.id)) ids.push(movie.id);
        showToast('Đã lưu phim vào danh sách Yêu Thích ❤️');
      } else {
        ids = ids.filter((id) => id !== movie.id);
        showToast('Đã bỏ lưu phim khỏi Yêu Thích');
      }

      localStorage.setItem('cyber_favorites', JSON.stringify(ids));
      setIsFavorite(newStatus);
    } catch {
      showToast('Cập nhật trạng thái yêu thích thất bại');
    }
  };

  if (loading) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center gap-3 bg-[#F4F7FB] dark:bg-[#070913]">
        <div className="w-10 h-10 border-3 border-[#00A6FF] dark:border-[#00F0FF] border-t-transparent rounded-full animate-spin shadow-md dark:shadow-[0_0_15px_#00F0FF]" />
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Đang nạp thông tin điện ảnh...
        </span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] text-center space-y-4 shadow-xl">
        <Film size={40} className="mx-auto text-slate-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Không tìm thấy phim</h2>
        <p className="text-xs text-slate-500 dark:text-slate-300">Tác phẩm này có thể đã bị xóa hoặc đường dẫn không chính xác.</p>
        <Link to="/movies">
          <Button variant="primary" size="md">Quay lại kho phim</Button>
        </Link>
      </div>
    );
  }

  // Danh sách diễn viên fallback an toàn
  const defaultCast = [
    { name: 'Kaelen Vance', character: 'Nhân vật chính', role: 'Diễn viên chính' },
    { name: 'Sora Tanaka', character: 'Chỉ huy phi đội', role: 'Diễn viên chính' },
    { name: 'Elena Rostova', character: 'Kỹ sư lượng tử', role: 'Diễn viên phụ' },
    { name: 'Marcus Chen', character: 'Hacker tập đoàn', role: 'Diễn viên phụ' },
  ];
  const castList = movie.cast && movie.cast.length > 0 ? movie.cast : defaultCast;

  return (
    <div className="relative min-h-screen bg-[#F4F7FB] dark:bg-[#070913] text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
      {/* Toast thông báo Cinema */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0d1224]/95 text-slate-100 text-xs font-bold px-4 py-2.5 rounded-xl border border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-xl animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Backdrop Banner Cinematic với độ chuyển mờ đa tầng */}
      <div className="relative w-full h-[50vh] sm:h-[58vh] min-h-[380px] overflow-hidden">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F7FB] dark:from-[#070913] via-[#F4F7FB]/70 dark:via-[#070913]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F7FB] dark:from-[#070913] via-[#F4F7FB]/85 dark:via-[#070913]/85 to-transparent sm:w-2/3" />

        {/* Nút Quay Lại Danh Sách (Touch Target >= 44px) */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-black/40 hover:bg-[#00F0FF]/20 text-slate-200 hover:text-[#00F0FF] border border-white/15 hover:border-[#00F0FF]/40 backdrop-blur-md text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} /> Quay lại danh sách
          </Link>
        </div>
      </div>

      {/* 2. Nội dung Chi tiết */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Cột Trái: Poster Tỷ Lệ 2:3 */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
            <div className="w-56 sm:w-64 md:w-full aspect-2/3 rounded-2xl overflow-hidden border-2 border-[#00A6FF]/40 dark:border-[#00F0FF]/40 shadow-2xl dark:shadow-[0_0_35px_rgba(0,240,255,0.3)] bg-slate-900 relative group">
              <img
                src={movie.posterUrl || movie.backdropUrl}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {movie.isVip && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="vip" className="font-black shadow-md">
                    VIP EXCLUSIVE
                  </Badge>
                </div>
              )}
            </div>

            {/* Cụm Thao Tác Nhanh (Touch Target >= 44px) */}
            <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
                  isFavorite
                    ? 'bg-rose-500/20 text-rose-500 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                    : 'bg-white dark:bg-[#0d1224] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#162038] hover:border-rose-400 hover:text-rose-500'
                }`}
              >
                <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
                <span>{isFavorite ? 'Đã Thích' : 'Yêu Thích'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 min-h-[44px] rounded-xl text-xs font-bold bg-white dark:bg-[#0d1224] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-all cursor-pointer active:scale-95"
              >
                <Share2 size={16} />
                <span>Chia Sẻ</span>
              </button>
            </div>
          </div>

          {/* Cột Phải: Thông tin tóm tắt & Nút Xem Ngay */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Badges Phân Loại & Đánh Giá */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="quality" className="font-black">
                {movie.quality === 'FOUR_K' ? '4K Ultra HD' : movie.quality}
              </Badge>
              <Badge variant="type">
                {movie.movieType === 'SINGLE' ? 'Phim Lẻ Chiếu Rạp' : 'Phim Bộ Đặc Sắc'}
              </Badge>
              <span className="text-xs text-amber-500 dark:text-[#FFEE00] font-black flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-md border border-[#FFEE00]/30 backdrop-blur-xs shadow-xs">
                <Star size={13} className="fill-amber-500 dark:fill-[#FFEE00]" /> {movie.rating} / 10
              </span>
            </div>

            {/* Tiêu Đề Phim (Cinema Hierarchy: White / High Contrast) */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-100 drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                {movie.title}
              </h1>
              {movie.originalTitle && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono tracking-wide">
                  Tên gốc: {movie.originalTitle}
                </p>
              )}
            </div>

            {/* Metadata (Năm, Thời lượng, Độ tuổi) */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#00A6FF] dark:text-[#00F0FF]" />
                <span>Năm phát hành: <strong className="text-slate-900 dark:text-slate-200">{movie.releaseYear}</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#00A6FF]" />
                <span>Thời lượng: <strong className="text-slate-900 dark:text-slate-200">{movie.durationMinutes || 120} phút</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Film size={15} className="text-[#9D00FF]" />
                <span>Độ tuổi: <strong className="text-slate-900 dark:text-slate-200">{movie.ageRating}</strong></span>
              </div>
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] text-slate-700 dark:text-slate-300 shadow-xs"
                >
                  #{g}
                </span>
              ))}
            </div>

            {/* Nút Xem Phim Ngay Lớn (Touch Target >= 48px) */}
            <div className="pt-2">
              <Link to={`/watch/${movie.slug}`}>
                <Button
                  size="lg"
                  variant="glow"
                  leftIcon={<Play size={20} className="fill-current" />}
                  className="min-h-[48px] px-8 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                >
                  XEM PHIM NGAY
                </Button>
              </Link>
            </div>

            {/* Nội dung Tóm Tắt (Độ tương phản cao trên nền tối #070913) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-2.5 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#00A6FF] dark:text-[#00F0FF] flex items-center gap-2">
                <Layers size={15} />
                <span>Tóm Tắt Cốt Truyện</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {movie.synopsis}
              </p>
            </div>

            {/* 3. KHU VỰC DIỄN VIÊN & ĐẠO DIỄN (CAST & CREW) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-4 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#00A6FF] dark:text-[#00F0FF] flex items-center gap-2">
                <User size={15} />
                <span>Diễn Viên & Ê-kíp Sản Xuất</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {castList.map((actor, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] flex items-center gap-3 transition-colors hover:border-[#00F0FF]/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#00F0FF] to-[#9D00FF] p-0.5 shrink-0 shadow-xs">
                      <div className="w-full h-full rounded-full bg-[#070913] flex items-center justify-center text-[#00F0FF] text-xs font-bold">
                        {actor.name.charAt(0)}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {actor.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {actor.character}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. KHU VỰC PHIM ĐỀ CỬ CÙNG THỂ LOẠI (RELATED MOVIES) */}
        {relatedMovies.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#162038]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Tác Phẩm Cùng Thể Loại</span>
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Khám phá thêm các bộ phim hấp dẫn được người xem đánh giá cao
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {relatedMovies.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
