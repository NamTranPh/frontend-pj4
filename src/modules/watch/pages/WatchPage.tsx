import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Share2,
  Maximize,
  Minimize2,
  MessageSquare,
  Send,
  Server,
  Check,
  SkipForward,
  AlertCircle,
  Sparkles,
  Crown,
  Volume2,
  User,
  Info,
} from 'lucide-react';
import { movieService } from '../../movies/services/movieService';
import { Movie } from '../../movies/types/movie.types';
import { VideoPlayer } from '../components/VideoPlayer';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useAuthModal } from '../../auth/context/AuthModalContext';

export const WatchPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<number>(1);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeServer, setActiveServer] = useState<'vip' | 'backup'>('vip');
  const [activeTab, setActiveTab] = useState<'comments' | 'info'>('comments');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [episodeGroup, setEpisodeGroup] = useState<number>(0);
  const { openLogin } = useAuthModal();

  const [comments, setComments] = useState<Array<{ name: string; time: string; text: string; isVip?: boolean }>>([
    {
      name: 'Nguyễn Thành Nam',
      time: '12 phút trước',
      text: 'Đoạn rượt đuổi ở khu chợ đêm neon xem cuốn thực sự! Kỹ xảo và âm thanh đỉnh cao.',
      isVip: true,
    },
    {
      name: 'CyberFan2088',
      time: '38 phút trước',
      text: 'Luồng phát HLS 4K mượt mà không bị giật, load cực nhanh luôn.',
      isVip: false,
    },
  ]);

  // Nạp dữ liệu phim từ slug
  useEffect(() => {
    const fetchMovie = async () => {
      if (!slug) return;
      const data = await movieService.getMovieBySlug(slug);
      setMovie(data);
    };
    fetchMovie();
  }, [slug]);

  // Đồng bộ trạng thái Yêu Thích với localStorage
  useEffect(() => {
    if (movie) {
      try {
        const saved = localStorage.getItem('cyber_favorites');
        if (saved) {
          const ids: (string | number)[] = JSON.parse(saved);
          setIsFavorite(ids.includes(movie.id));
        }
      } catch {
        // Bỏ qua lỗi parse
      }
    }
  }, [movie]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Đã sao chép liên kết chia sẻ phim!');
  };

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
          isVip: true,
        },
        ...comments,
      ]);
      setCommentText('');
      showToast('Đã đăng bình luận thành công!');
    }
  };

  if (!movie) {
    return (
      <div className="h-[75vh] flex flex-col items-center justify-center gap-4 bg-[#F4F7FB] dark:bg-[#070913]">
        <div className="w-12 h-12 border-3 border-[#00A6FF] dark:border-[#00F0FF] border-t-transparent rounded-full animate-spin shadow-md dark:shadow-[0_0_15px_#00F0FF]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#00A6FF] dark:text-[#00F0FF] animate-pulse">
          Đang khởi tạo trình phát HLS 4K...
        </span>
      </div>
    );
  }

  const isSeries = movie.movieType === 'SERIES';
  const totalEpisodes = movie.totalEpisodes || (isSeries ? 24 : 1);
  const EPISODES_PER_GROUP = 20;
  const totalGroups = Math.ceil(totalEpisodes / EPISODES_PER_GROUP);

  // Lọc danh sách tập trong nhóm hiện tại
  const currentGroupEpisodes = Array.from({ length: totalEpisodes }).slice(
    episodeGroup * EPISODES_PER_GROUP,
    (episodeGroup + 1) * EPISODES_PER_GROUP
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast thông báo Cinema (Thay thế hoàn toàn alert thô) */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0d1224]/95 text-slate-100 text-xs font-bold px-4 py-2.5 rounded-xl border border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-xl animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
          <Sparkles size={14} className="text-[#00F0FF]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Thanh Điều Hướng Trên Cùng */}
      <div className="flex items-center justify-between">
        <Link
          to={`/movies/${movie.slug}`}
          className="inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#0d1224] text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-[#00F0FF] border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/40 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowLeft size={16} />
          <span>Quay lại thông tin phim</span>
        </Link>

        {/* Nút Rạp Chiếu Phim (Cinema Mode) */}
        <button
          onClick={() => setIsCinemaMode(!isCinemaMode)}
          className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0d1224] hover:bg-slate-100 dark:hover:bg-[#00F0FF]/15 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-[#00F0FF] border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/40 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {isCinemaMode ? <Minimize2 size={15} /> : <Maximize size={15} />}
          <span className="hidden sm:inline">
            {isCinemaMode ? 'Thu Nhỏ Player' : 'Chế Độ Rạp Phim'}
          </span>
        </button>
      </div>

      {/* 1. KHUNG TRÌNH PHÁT VIDEO CHUẨN VIDSTACK CYBERPUNK */}
      <VideoPlayer
        title={`${movie.title} - ${isSeries ? `Tập ${currentEpisode}` : 'Bản Đầy Đủ'}`}
        src={movie.videoUrl}
        poster={movie.backdropUrl || movie.posterUrl}
        isCinemaMode={isCinemaMode}
        onEnded={() => {
          if (isSeries && currentEpisode < totalEpisodes) {
            setCurrentEpisode(currentEpisode + 1);
            showToast(`Đã tự động chuyển sang tập ${currentEpisode + 1}`);
          }
        }}
      />

      {/* 2. THANH THAO TÁC SERVER & CỤM ĐIỀU HƯỚNG NHANH DƯỚI PLAYER */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-sm">
        {/* Lựa chọn Server phát */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-1">
            <Server size={14} className="text-[#00F0FF]" /> Server:
          </span>
          <button
            type="button"
            onClick={() => setActiveServer('vip')}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
              activeServer === 'vip'
                ? 'bg-linear-to-r from-[#00F0FF] to-[#00A6FF] text-[#070913] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'bg-slate-100 dark:bg-[#070913] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#162038]'
            }`}
          >
            <Crown size={13} />
            <span>Server VIP 4K</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveServer('backup')}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
              activeServer === 'backup'
                ? 'bg-linear-to-r from-[#00F0FF] to-[#00A6FF] text-[#070913] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'bg-slate-100 dark:bg-[#070913] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#162038]'
            }`}
          >
            <span>Dự Phòng MinIO</span>
          </button>
        </div>

        {/* Nút chuyển tập kế tiếp & Báo lỗi video */}
        <div className="flex items-center gap-2">
          {isSeries && currentEpisode < totalEpisodes && (
            <button
              type="button"
              onClick={() => setCurrentEpisode(currentEpisode + 1)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 hover:bg-[#00F0FF]/25 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <SkipForward size={14} />
              <span>Tập Tiếp Theo</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => showToast('Cảm ơn bạn! Đã ghi nhận phản hồi báo lỗi video.')}
            className="min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <AlertCircle size={14} />
            <span className="hidden sm:inline">Báo Lỗi</span>
          </button>
        </div>
      </div>

      {/* 3. THÔNG TIN TIÊU ĐỀ & CỤM TƯƠNG TÁC CHÍNH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="quality" className="font-black">
              {movie.quality === 'FOUR_K' ? '4K Ultra HD' : movie.quality}
            </Badge>
            {movie.isVip && (
              <Badge variant="vip" className="font-black">
                VIP EXCLUSIVE
              </Badge>
            )}
            <span className="text-xs text-amber-500 dark:text-[#FFEE00] font-black flex items-center gap-1">
              ★ {movie.rating} / 10
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {movie.title} {isSeries && <span className="text-[#00A6FF] dark:text-[#00F0FF]">• Tập {currentEpisode}</span>}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.genres.join(', ')}</span>
            {movie.durationMinutes && (
              <>
                <span>•</span>
                <span>{movie.durationMinutes} phút</span>
              </>
            )}
          </div>
        </div>

        {/* Nút Yêu Thích & Chia Sẻ (Touch Target chuẩn >= 40px) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label="Yêu thích phim"
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-500/50 shadow-xs'
                : 'bg-slate-50 dark:bg-[#070913] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#162038] hover:border-rose-400 hover:text-rose-500'
            }`}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
            <span>{isFavorite ? 'Đã Thích' : 'Yêu Thích'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Chia sẻ phim"
            className="min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 dark:bg-[#070913] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Share2 size={16} />
            <span>Chia Sẻ</span>
          </button>
        </div>
      </div>

      {/* 4. BỐ CỤC 2 CỘT: NỘI DUNG/BÌNH LUẬN (8/12) & DANH SÁCH TẬP (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (8/12): Tabs Bình Luận & Tóm Tắt Diễn Viên */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#162038] pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('comments')}
              className={`min-h-[38px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'comments'
                  ? 'bg-blue-50 dark:bg-[#00F0FF]/15 text-[#00A6FF] dark:text-[#00F0FF] border border-blue-200 dark:border-[#00F0FF]/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare size={15} />
              <span>Bình Luận ({comments.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`min-h-[38px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-blue-50 dark:bg-[#00F0FF]/15 text-[#00A6FF] dark:text-[#00F0FF] border border-blue-200 dark:border-[#00F0FF]/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Info size={15} />
              <span>Tóm Tắt & Diễn Viên</span>
            </button>
          </div>

          {/* TAB 1: BÌNH LUẬN */}
          {activeTab === 'comments' && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-4 shadow-sm animate-in fade-in duration-200">
              {/* Form Gửi Bình Luận */}
              <form onSubmit={handleAddComment} className="flex gap-2.5">
                <input
                  type="text"
                  placeholder="Chia sẻ cảm nhận của bạn về tập phim này..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none transition-all focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                />
                <Button type="submit" variant="primary" size="sm" className="min-h-[42px] px-4" rightIcon={<Send size={14} />}>
                  Gửi
                </Button>
              </form>

              {/* Danh Sách Bình Luận */}
              <div className="space-y-3 pt-2">
                {comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#070913]/70 border border-slate-200 dark:border-[#162038] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-linear-to-tr from-[#00F0FF] to-[#9D00FF] p-0.5 flex items-center justify-center text-white">
                          <User size={12} />
                        </div>
                        <span className="font-bold text-[#00A6FF] dark:text-[#00F0FF]">{c.name}</span>
                        {c.isVip && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-500 dark:text-[#FFEE00]">
                            VIP
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TÓM TẮT & DIỄN VIÊN */}
          {activeTab === 'info' && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-5 shadow-sm animate-in fade-in duration-200">
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#00A6FF] dark:text-[#00F0FF]">
                  Cốt Truyện Điện Ảnh
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Diễn viên & Đạo diễn mẫu */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-[#162038]">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#00A6FF] dark:text-[#00F0FF]">
                  Diễn Viên & Ê-kíp
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(movie.cast && movie.cast.length > 0
                    ? movie.cast
                    : [
                        { name: 'Alex Vance', character: 'Nhân vật chính' },
                        { name: 'Elena Rostova', character: 'Chỉ huy ngầm' },
                        { name: 'Kaelen Cross', character: 'Hacker lượng tử' },
                        { name: 'Sora Tanaka', character: 'Phi công chiến đấu' },
                      ]
                  ).map((actor, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[#00F0FF] text-xs font-bold shrink-0">
                        {actor.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {actor.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {actor.character}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI (4/12): DANH SÁCH TẬP PHIM GỌN GÀNG (TOUCH TARGET >= 40PX) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#162038] pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Danh Sách Tập</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              </h3>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                {totalEpisodes} {isSeries ? 'Tập' : 'Bản Full'}
              </span>
            </div>

            {/* Nhóm tab chọn khoảng tập (nếu trên 20 tập) */}
            {totalGroups > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {Array.from({ length: totalGroups }).map((_, gIdx) => {
                  const start = gIdx * EPISODES_PER_GROUP + 1;
                  const end = Math.min((gIdx + 1) * EPISODES_PER_GROUP, totalEpisodes);
                  const isCurrentGroup = gIdx === episodeGroup;
                  return (
                    <button
                      key={gIdx}
                      type="button"
                      onClick={() => setEpisodeGroup(gIdx)}
                      className={`min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isCurrentGroup
                          ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50'
                          : 'bg-slate-100 dark:bg-[#070913] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#162038]'
                      }`}
                    >
                      {start}-{end}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Lưới các nút tập phim (Touch Target đạt >= 42x42px) */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2">
              {currentGroupEpisodes.map((_, idx) => {
                const epNum = episodeGroup * EPISODES_PER_GROUP + idx + 1;
                const isActive = epNum === currentEpisode;
                return (
                  <button
                    key={epNum}
                    type="button"
                    onClick={() => setCurrentEpisode(epNum)}
                    className={`min-h-[44px] min-w-[44px] rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center relative active:scale-95 ${
                      isActive
                        ? 'bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.5)] font-black scale-102 border-transparent'
                        : 'bg-slate-100 dark:bg-[#070913] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/50 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {isActive && <Volume2 size={11} className="animate-pulse" />}
                      <span>{epNum < 10 ? `0${epNum}` : epNum}</span>
                    </div>
                    <span className="text-[9px] opacity-75 font-normal">
                      {isActive ? 'Đang xem' : 'Tập'}
                    </span>
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
