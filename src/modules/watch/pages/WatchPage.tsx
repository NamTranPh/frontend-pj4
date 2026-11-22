import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Maximize, Film, MessageSquare, Send } from 'lucide-react';
import { movieService } from '../../movies/services/movieService';
import { Movie } from '../../movies/types/movie.types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useAuthModal } from '../../auth/context/AuthModalContext';

export const WatchPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<number>(1);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const { openLogin } = useAuthModal();
  const [comments, setComments] = useState<Array<{ name: string; time: string; text: string }>>([
    {
      name: 'Nguyễn Thành Nam',
      time: '10 phút trước',
      text: 'Đoạn rượt đuổi ở khu chợ đêm neon xem cuốn thực sự! Kỹ xảo và âm thanh đỉnh cao.',
    },
    {
      name: 'CyberFan2088',
      time: '35 phút trước',
      text: 'Luồng phát HLS 4K mượt mà không bị giật, load cực nhanh luôn.',
    },
  ]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!slug) return;
      const data = await movieService.getMovieBySlug(slug);
      setMovie(data);
    };
    fetchMovie();
  }, [slug]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      openLogin();
      return;
    }
    if (commentText.trim()) {
      setComments([
        {
          name: 'Bạn (Thành viên VIP)',
          time: 'Vừa xong',
          text: commentText.trim(),
        },
        ...comments,
      ]);
      setCommentText('');
    }
  };

  if (!movie) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-3 border-[#00A6FF] dark:border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Đang khởi tạo trình phát HLS...</span>
      </div>
    );
  }

  const totalEpisodes = movie.totalEpisodes || (movie.movieType === 'SERIES' ? 12 : 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Thanh Điều Hướng Trên Cùng */}
      <div className="flex items-center justify-between">
        <Link
          to={`/movies/${movie.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#00F0FF] transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại thông tin phim
        </Link>

        {/* Nút Rạp Chiếu Phim (Cinema Mode) */}
        <button
          onClick={() => setIsCinemaMode(!isCinemaMode)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0d1224] hover:bg-slate-100 dark:hover:bg-[#00F0FF]/15 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-[#00F0FF] border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/40 text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <Maximize size={14} />
          {isCinemaMode ? 'Thu Nhỏ Player' : 'Chế Độ Rạp Phim'}
        </button>
      </div>

      {/* 1. KHUNG TRÌNH PHÁT VIDEO CHUẨN CYBERPUNK (THEO ẢNH 1) */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-black border border-[#00A6FF]/40 dark:border-[#00F0FF]/30 shadow-xl dark:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all duration-500 ${
          isCinemaMode ? 'aspect-21/9 max-h-[85vh]' : 'aspect-16/9'
        }`}
      >
        {movie.videoUrl ? (
          <video
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            poster={movie.backdropUrl}
            src={movie.videoUrl}
          >
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[#070913] text-center p-6">
            <Film size={48} className="text-[#00F0FF] animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Đang kết nối luồng phát HLS an toàn</h3>
              <p className="text-xs text-slate-400">
                Luồng video mã hóa HLS .m3u8 được xác thực qua token tự động từ Backend Spring Boot.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. CỤM THAO TÁC NHANH DƯỚI PLAYER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="quality">{movie.quality}</Badge>
            {movie.isVip && <Badge variant="vip">VIP</Badge>}
            <span className="text-xs text-amber-500 dark:text-[#FFEE00] font-bold">★ {movie.rating}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {movie.title} - {movie.movieType === 'SERIES' ? `Tập ${currentEpisode}` : 'Bản Đầy Đủ (Full Movie)'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-500/50 shadow-sm'
                : 'bg-slate-50 dark:bg-[#070913] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#162038] hover:border-rose-400 hover:text-rose-500'
            }`}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
            {isFavorite ? 'Đã Thích' : 'Yêu Thích'}
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Đã sao chép liên kết chia sẻ!');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-[#070913] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-all cursor-pointer"
          >
            <Share2 size={16} /> Chia Sẻ
          </button>
        </div>
      </div>

      {/* 3. BỐ CỤC 2 CỘT: DANH SÁCH TẬP & BÌNH LUẬN (THEO ẢNH 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (8/12): HỘP BÌNH LUẬN & ĐÁNH GIÁ */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-[#00A6FF] dark:text-[#00F0FF]" />
              <span>Bình Luận & Đánh Giá Phim</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({comments.length})</span>
            </h3>

            {/* Form Gửi Bình Luận */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Chia sẻ cảm nhận của bạn về bộ phim..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none transition-all"
              />
              <Button type="submit" variant="primary" size="sm" rightIcon={<Send size={14} />}>
                Gửi
              </Button>
            </form>

            {/* Danh Sách Bình Luận */}
            <div className="space-y-3 pt-2">
              {comments.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070913]/60 border border-slate-200 dark:border-[#162038] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#00A6FF] dark:text-[#00F0FF]">{c.name}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (4/12): DANH SÁCH TẬP PHIM (THEO ẢNH 1 - Cột Tập Phim 01, 02, 03...) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Danh Sách Tập Phim
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {totalEpisodes} {totalEpisodes > 1 ? 'Tập' : 'Bản Đầy Đủ'}
              </span>
            </div>

            {/* Lưới Nút Số Tập Phim Cyberpunk */}
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
              {Array.from({ length: totalEpisodes }).map((_, idx) => {
                const epNum = idx + 1;
                const isActive = epNum === currentEpisode;
                return (
                  <button
                    key={epNum}
                    onClick={() => setCurrentEpisode(epNum)}
                    className={`h-11 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.5)] font-black scale-105'
                        : 'bg-slate-100 dark:bg-[#070913] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{epNum < 10 ? `0${epNum}` : epNum}</span>
                    <span className="text-[9px] opacity-75 font-normal">Tập</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
