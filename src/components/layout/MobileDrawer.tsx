import React, { useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Film,
  Crown,
  Search,
  X,
  User,
  Heart,
  History,
  LogOut,
  Tv,
  Sparkles,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  isAuthenticated: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

const FEATURED_GENRES = [
  'Hành Động',
  'Cyberpunk',
  'Anime',
  'Viễn Tưởng',
  'Kinh Dị',
  'Tình Cảm',
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  isAuthenticated,
  onOpenLogin,
  onLogout,
}) => {
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);

  // 1. Quản lý Scroll Lock cho body khi Drawer mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 2. Lắng nghe phím Escape để đóng Drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleGenreClick = (genre: string) => {
    onClose();
    navigate(`/movies?genre=${encodeURIComponent(genre)}`);
  };

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/65 dark:bg-[#070913]/75 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Off-canvas Slide-over Panel (Từ cạnh trái vào) */}
      <aside
        ref={drawerRef}
        aria-label="Menu điều hướng di động"
        aria-hidden={!isOpen}
        className={`fixed top-0 bottom-0 left-0 w-[86vw] max-w-sm sm:max-w-md bg-white/95 dark:bg-[#070913]/95 backdrop-blur-2xl border-r border-slate-200 dark:border-[#162038] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Drawer: Logo & Nút Đóng */}
        <div className="h-18 px-5 flex items-center justify-between border-b border-slate-200 dark:border-[#162038] shrink-0">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#00F0FF] via-[#00A6FF] to-[#9D00FF] p-0.5 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center text-[#00F0FF]">
                <Film size={20} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-r dark:from-white dark:via-slate-100 dark:to-[#00F0FF]">
                CYBER<span className="text-[#00A6FF] dark:text-[#00F0FF]">FLIX</span>
              </span>
              <span className="text-[8px] tracking-widest text-[#00A6FF] dark:text-[#00F0FF] uppercase font-bold -mt-0.5 opacity-90">
                Stream GenZ
              </span>
            </div>
          </Link>

          {/* Nút đóng Touch target >= 40x40px */}
          <button
            onClick={onClose}
            aria-label="Đóng menu"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/40 active:scale-95 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nội dung cuộn mượt mà của Drawer */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* 1. Ô tìm kiếm HUD tích hợp trong Drawer */}
          <form onSubmit={(e) => { onSearchSubmit(e); onClose(); }} className="relative w-full">
            <input
              type="text"
              placeholder="Tìm phim, đạo diễn, diễn viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/90 dark:bg-[#0d1224]/90 border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-10 pr-9 py-2.5 outline-none transition-all focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* 2. Mini User Card / Login Action */}
          {isAuthenticated ? (
            <div className="p-3.5 rounded-2xl bg-linear-to-r from-blue-500/10 via-purple-500/10 to-transparent dark:from-[#00F0FF]/10 dark:via-[#9D00FF]/10 border border-blue-200 dark:border-[#00F0FF]/25 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-[#00F0FF] to-[#9D00FF] p-0.5 shadow-sm">
                  <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center text-[#00F0FF]">
                    <User size={18} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Thành viên Fuseflix
                  </div>
                  <div className="text-[11px] text-[#00A6FF] dark:text-[#00F0FF] font-semibold flex items-center gap-1">
                    <Sparkles size={11} /> Đã xác thực bảo mật
                  </div>
                </div>
              </div>

              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-[#00F0FF] border border-slate-200 dark:border-white/10"
              >
                <User size={14} className="text-[#00F0FF]" /> Hồ sơ tài khoản
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 dark:border-white/10">
                <Link
                  to="/favorites"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#0d1224] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-500 border border-slate-200 dark:border-[#162038]"
                >
                  <Heart size={14} className="text-rose-500" /> Yêu thích
                </Link>
                <Link
                  to="/history"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#0d1224] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-400 border border-slate-200 dark:border-[#162038]"
                >
                  <History size={14} className="text-cyan-400" /> Lịch sử
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut size={14} /> Đăng xuất tài khoản
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0d1224]/80 border border-slate-200 dark:border-[#162038] space-y-3">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Flame size={14} className="text-[#00F0FF]" /> Trải Nghiệm Chuẩn Cinema
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Đăng nhập để đồng bộ lịch sử xem, phim yêu thích và mở khóa chất lượng 4K.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full h-10"
                leftIcon={<User size={15} />}
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
              >
                Đăng Nhập / Đăng Ký
              </Button>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
                <Link
                  to="/favorites"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#070913] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-500 border border-slate-200 dark:border-[#162038]"
                >
                  <Heart size={14} className="text-rose-500" /> Yêu thích
                </Link>
                <Link
                  to="/history"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#070913] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-400 border border-slate-200 dark:border-[#162038]"
                >
                  <History size={14} className="text-cyan-400" /> Lịch sử
                </Link>
              </div>
            </div>
          )}

          {/* 3. Danh Sách Menu Điều Hướng Chính */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3">
              Khám Phá
            </span>

            <nav className="flex flex-col gap-1 pt-1">
              <NavLink
                to="/"
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/30 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Film size={18} className="text-[#00A6FF] dark:text-[#00F0FF]" />
                  <span>Trang Chủ</span>
                </div>
                <ChevronRight size={16} className="text-slate-400 opacity-60" />
              </NavLink>

              <NavLink
                to="/movies?type=SINGLE"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/30 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Tv size={18} className="text-[#00A6FF] dark:text-[#00F0FF]" />
                  <span>Phim Lẻ Chiếu Rạp</span>
                </div>
                <ChevronRight size={16} className="text-slate-400 opacity-60" />
              </NavLink>

              <NavLink
                to="/movies?type=SERIES"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/30 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Film size={18} className="text-[#9D00FF]" />
                  <span>Phim Bộ Đặc Sắc</span>
                </div>
                <ChevronRight size={16} className="text-slate-400 opacity-60" />
              </NavLink>

              <NavLink
                to="/vip"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? 'text-amber-600 dark:text-[#FFEE00] bg-amber-50 dark:bg-[#FFEE00]/15 border border-amber-300 dark:border-[#FFEE00]/40 shadow-xs'
                      : 'text-amber-600 dark:text-[#FFEE00] hover:bg-amber-50 dark:hover:bg-[#FFEE00]/10'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Crown size={18} className="text-amber-500 dark:text-[#FFEE00]" />
                  <span>Gói VIP PayOS</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-[#FFEE00] uppercase tracking-wider">
                  HOT
                </span>
              </NavLink>
            </nav>
          </div>

          {/* 4. Thể loại phim phổ biến (Quick Genre Chips) */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-[#162038]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3">
              Thể Loại Nổi Bật
            </span>
            <div className="grid grid-cols-2 gap-2">
              {FEATURED_GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreClick(genre)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-all text-left truncate cursor-pointer active:scale-95"
                >
                  #{genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Drawer: Theme Switcher & Version */}
        <div className="p-4 border-t border-slate-200 dark:border-[#162038] flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-[#070913]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Giao diện:</span>
            <ThemeToggle />
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            v1.0 • Cyber Cinema
          </span>
        </div>
      </aside>
    </>
  );
};
