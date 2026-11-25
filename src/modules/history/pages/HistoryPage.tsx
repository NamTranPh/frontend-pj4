import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Play, Trash2, ArrowLeft, Clock, Film, Sparkles, CheckCircle2 } from 'lucide-react';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { showToast, showConfirmDialog } from '../../../utils/alert';

export interface WatchHistoryItem {
  id: string | number;
  movieSlug: string;
  movieTitle: string;
  posterUrl: string;
  backdropUrl?: string;
  episode?: number;
  totalEpisodes?: number;
  currentTime: number; // in seconds
  duration: number; // in seconds
  updatedAt: string;
}

const DEFAULT_MOCK_HISTORY: WatchHistoryItem[] = [
  {
    id: '1',
    movieSlug: 'chu-thuat-hoi-chien',
    movieTitle: 'Chú Thuật Hồi Chiến (Jujutsu Kaisen 0)',
    posterUrl: '/img/banner/chu_thuat_hoi_chien/chu_thuat_hoi_chien.png',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop',
    currentTime: 3120,
    duration: 6300,
    updatedAt: '2 giờ trước',
  },
  {
    id: '5',
    movieSlug: 'sword-art-online-gun-gale-online-2',
    movieTitle: 'Sword Art Online: Gun Gale Online Phần 2',
    posterUrl: '/img/banner/sword_art_online_ngoai_truyen_gun_gale_online_phan_2/logo.png',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
    episode: 4,
    totalEpisodes: 24,
    currentTime: 850,
    duration: 1440,
    updatedAt: 'Hôm qua',
  },
];

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const HistoryPage: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<WatchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadHistory = () => {
    setIsLoading(true);
    try {
      const saved = localStorage.getItem('cyber_watch_history');
      if (saved) {
        setHistoryItems(JSON.parse(saved));
      } else {
        // Khởi tạo mock data ban đầu nếu người dùng chưa có
        localStorage.setItem('cyber_watch_history', JSON.stringify(DEFAULT_MOCK_HISTORY));
        setHistoryItems(DEFAULT_MOCK_HISTORY);
      }
    } catch {
      setHistoryItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClearAll = async () => {
    if (historyItems.length === 0) return;

    const res = await showConfirmDialog({
      title: 'Xóa Sạch Lịch Sử Xem Phim?',
      text: 'Toàn bộ tiến độ xem dở và danh sách phim bạn đã xem sẽ bị xóa hoàn toàn. Bạn có chắc chắn muốn xóa?',
      confirmText: 'Xóa Sạch',
      cancelText: 'Giữ Lại',
      icon: 'warning',
    });

    if (res.isConfirmed) {
      localStorage.setItem('cyber_watch_history', JSON.stringify([]));
      setHistoryItems([]);
      showToast.success('Đã xóa sạch toàn bộ lịch sử xem phim!');
    }
  };

  const handleRemoveItem = async (e: React.MouseEvent, id: string | number, title: string) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await showConfirmDialog({
      title: 'Xóa Phim Này Khỏi Lịch Sử?',
      text: `Tiến độ xem của "${title}" sẽ bị gỡ khỏi lịch sử.`,
      confirmText: 'Xóa',
      cancelText: 'Hủy',
      icon: 'warning',
    });

    if (res.isConfirmed) {
      const updated = historyItems.filter((item) => item.id !== id);
      localStorage.setItem('cyber_watch_history', JSON.stringify(updated));
      setHistoryItems(updated);
      showToast.info('Đã xóa bộ phim khỏi lịch sử xem.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header & Tiêu Đề */}
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
            <span className="text-slate-800 dark:text-slate-200 font-bold">Lịch Sử Xem</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00A6FF] dark:text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <History size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Lịch Sử & Tiếp Tục Xem
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Lưu trữ tiến độ phát tự động — Chọn để tiếp tục xem từ phút bạn tạm dừng
              </p>
            </div>
          </div>
        </div>

        {/* Nút Thao Tác Nhanh */}
        {historyItems.length > 0 && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="min-h-[40px] px-4 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Trash2 size={14} />
              <span>Xóa Lịch Sử</span>
            </Button>
            <Link to="/movies">
              <Button
                variant="primary"
                className="min-h-[40px] px-4 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                <Sparkles size={14} className="mr-1.5" />
                <span>Xem Thêm Phim Mới</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Danh Sách Lịch Sử Hoặc Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-800/60 animate-pulse border border-slate-300 dark:border-slate-700/40"
            />
          ))}
        </div>
      ) : historyItems.length === 0 ? (
        <EmptyState
          icon={<History size={38} className="text-[#00F0FF] animate-pulse" />}
          title="Lịch Sử Xem Đang Trống"
          description="Bạn chưa xem bộ phim nào gần đây hoặc đã làm sạch lịch sử. Hãy bật ngay một siêu phẩm bom tấn để tự động lưu tiến độ xem tại đây!"
          actionLabel="Khám Phá Phim Đề Cử"
          linkTo="/movies"
          secondaryLabel="Về Trang Chủ"
          secondaryLinkTo="/"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyItems.map((item) => {
            const progressPercent = Math.min(
              100,
              Math.max(0, Math.round((item.currentTime / item.duration) * 100))
            );
            const isCompleted = progressPercent >= 95;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/40 shadow-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] overflow-hidden transition-all duration-300"
              >
                {/* Khung Poster / Thumbnail 16:9 */}
                <div className="relative aspect-16/9 w-full overflow-hidden bg-black">
                  <img
                    src={item.backdropUrl || item.posterUrl}
                    alt={item.movieTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#070913] via-black/40 to-transparent" />

                  {/* Nút Play Nổi Bật Trên Ảnh */}
                  <Link
                    to={`/watch/${item.movieSlug}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#00F0FF] text-[#070913] flex items-center justify-center shadow-[0_0_20px_#00F0FF] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={20} className="fill-[#070913] ml-0.5" />
                    </div>
                  </Link>

                  {/* Badges góc trên */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {item.episode ? (
                      <Badge variant="cyan">Tập {item.episode}</Badge>
                    ) : (
                      <Badge variant="cyan">Bản Đầy Đủ</Badge>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold">
                        <CheckCircle2 size={10} /> Đã xem xong
                      </span>
                    )}
                  </div>

                  {/* Nút Xóa Nhanh */}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(e, item.id, item.movieTitle)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl bg-black/60 hover:bg-rose-600 text-slate-300 hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100"
                    title="Xóa khỏi lịch sử"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* THANH TIẾN TRÌNH XEM DỞ NEON CYAN #00F0FF */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/80">
                    <div
                      style={{ width: `${progressPercent}%` }}
                      className="h-full bg-linear-to-r from-[#00A6FF] to-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.9)] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Nội Dung Thông Tin */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-[#00A6FF] dark:group-hover:text-[#00F0FF] transition-colors">
                      {item.movieTitle}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1 font-mono text-[11px] text-[#00A6FF] dark:text-[#00F0FF]">
                        <Clock size={12} />
                        {formatDuration(item.currentTime)} / {formatDuration(item.duration)} ({progressPercent}%)
                      </span>
                      <span className="text-[11px] text-slate-400">{item.updatedAt}</span>
                    </div>
                  </div>

                  {/* Nút Tiếp Tục Xem */}
                  <Link to={`/watch/${item.movieSlug}`}>
                    <Button
                      variant="primary"
                      className="w-full min-h-[38px] text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.25)] hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] cursor-pointer"
                    >
                      <Play size={13} className="fill-current" />
                      <span>Tiếp Tục Xem Từ Phút {Math.floor(item.currentTime / 60)}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
