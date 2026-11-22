import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Calendar, Clock, Heart, Share2, Film, Check, ArrowLeft } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie.types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const MovieDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await movieService.getMovieBySlug(slug);
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-3 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-400">Đang tải thông tin phim...</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-[#0d1224] border border-[#162038] text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Không tìm thấy phim</h2>
        <Link to="/movies">
          <Button variant="primary">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      {/* 1. Backdrop Banner Cinematic */}
      <div className="relative w-full h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#070913] via-slate-50/70 dark:via-[#070913]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-[#070913] via-slate-50/80 dark:via-[#070913]/80 to-transparent" />

        {/* Nút Quay Lại */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-[#00A6FF]/20 dark:hover:bg-[#00F0FF]/20 text-slate-200 hover:text-[#00A6FF] dark:hover:text-[#00F0FF] border border-white/10 hover:border-[#00F0FF]/40 backdrop-blur-md text-xs font-semibold transition-all"
          >
            <ArrowLeft size={16} /> Quay lại danh sách
          </Link>
        </div>
      </div>

      {/* 2. Nội dung Chi tiết */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Cột Trái: Poster Tỷ Lệ 2:3 */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
            <div className="w-56 sm:w-64 md:w-full aspect-2/3 rounded-2xl overflow-hidden border-2 border-[#00A6FF]/40 dark:border-[#00F0FF]/40 shadow-xl dark:shadow-[0_0_30px_rgba(0,240,255,0.3)] bg-slate-900 relative group">
              <img src={movie.posterUrl || movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
              {movie.isVip && (
                <div className="absolute top-3 left-3">
                  <Badge variant="vip">VIP EXCLUSIVE</Badge>
                </div>
              )}
            </div>

            {/* Cụm Thao Tác Nhanh */}
            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500/20 text-rose-500 dark:text-rose-400 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                    : 'bg-white dark:bg-[#0d1224] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#162038] hover:border-rose-500/40 hover:text-rose-500'
                }`}
              >
                <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
                {isFavorite ? 'Đã Thích' : 'Yêu Thích'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-[#0d1224] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-all cursor-pointer"
              >
                {copied ? <Check size={16} className="text-[#00A6FF] dark:text-[#00F0FF]" /> : <Share2 size={16} />}
                {copied ? 'Đã Sao Chép' : 'Chia Sẻ'}
              </button>
            </div>
          </div>

          {/* Cột Phải: Thông tin tóm tắt & Nút Xem Ngay */}
          <div className="md:col-span-8 lg:col-span-9 space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="quality">{movie.quality}</Badge>
              <Badge variant="type">{movie.movieType === 'SINGLE' ? 'Phim Lẻ' : 'Phim Bộ'}</Badge>
              <span className="text-xs text-amber-600 dark:text-[#FFEE00] font-bold flex items-center gap-1 bg-amber-50 dark:bg-black/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-[#FFEE00]/30 backdrop-blur-xs">
                <Star size={13} className="fill-amber-500 dark:fill-[#FFEE00]" /> {movie.rating} / 10
              </span>
            </div>

            {/* Tiêu Đề Phim */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(0,240,255,0.35)]">
                {movie.title}
              </h1>
              {movie.originalTitle && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono tracking-wide">
                  Tên gốc: {movie.originalTitle}
                </p>
              )}
            </div>

            {/* Metadata (Năm, Thời lượng, Đánh giá) */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#00A6FF] dark:text-[#00F0FF]" />
                <span>Năm: {movie.releaseYear}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#00A6FF]" />
                <span>Thời lượng: {movie.durationMinutes || 120} phút</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Film size={15} className="text-[#9D00FF]" />
                <span>Độ tuổi: {movie.ageRating}</span>
              </div>
            </div>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] text-slate-700 dark:text-slate-300"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Nút Xem Ngay Lớn */}
            <div className="pt-2">
              <Link to={`/watch/${movie.slug}`}>
                <Button size="lg" variant="glow" leftIcon={<Play size={20} className="fill-current" />}>
                  XEM PHIM NGAY
                </Button>
              </Link>
            </div>

            {/* Nội dung Tóm Tắt */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#00A6FF] dark:text-[#00F0FF]">
                Tóm Tắt Cốt Truyện
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {movie.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
