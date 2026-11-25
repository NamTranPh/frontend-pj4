import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Film,
  Crown,
  User,
  Menu,
  X,
  ChevronDown,
  Heart,
  History,
  LogOut,
  Sparkles,
  Flame,
  Tv,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuthModal } from '../../modules/auth/context/AuthModalContext';
import { authService } from '../../modules/auth/services/authService';
import { MobileDrawer } from './MobileDrawer';

const GENRE_DROPDOWN_ITEMS = [
  { name: 'Cyberpunk', desc: 'Thế giới tương lai & Kỹ xảo' },
  { name: 'Hành Động', desc: 'Những pha rượt đuổi nghẹt thở' },
  { name: 'Anime', desc: 'Đồ họa đỉnh cao Nhật Bản' },
  { name: 'Viễn Tưởng', desc: 'Khám phá vũ trụ & Khoa học' },
  { name: 'Kinh Dị', desc: 'Hồi hộp, rùng rợn & Kịch tính' },
  { name: 'Tình Cảm', desc: 'Lãng mạn & Xúc động' },
];

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('accessToken'));
  });
  const [favoritesCount, setFavoritesCount] = useState<number>(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const genresDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { openLogin } = useAuthModal();

  // 1. Kiểm tra trạng thái Authentication & Favorites Count từ localStorage
  useEffect(() => {
    const checkState = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('accessToken')));
      try {
        const saved = localStorage.getItem('cyber_favorites');
        if (saved) {
          const ids = JSON.parse(saved);
          setFavoritesCount(Array.isArray(ids) ? ids.length : 0);
        } else {
          setFavoritesCount(0);
        }
      } catch {
        setFavoritesCount(0);
      }
    };
    checkState();
    window.addEventListener('storage', checkState);
    return () => window.removeEventListener('storage', checkState);
  }, [location.pathname]);

  // 2. Đóng dropdowns khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        genresDropdownRef.current &&
        !genresDropdownRef.current.contains(e.target as Node)
      ) {
        setIsGenresOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 3. Phím tắt toàn cục Ctrl+K hoặc Cmd+K để focus vào ô tìm kiếm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 4. Xử lý submit tìm kiếm
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#070913]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#162038]/80 transition-colors duration-300">
        {/* Đường viền Neon phát sáng gradient siêu mảnh ở mép đáy header */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-[#00F0FF]/35 to-transparent pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
          {/* Cụm 1: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#00F0FF] via-[#00A6FF] to-[#9D00FF] p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center text-[#00F0FF]">
                <Film size={22} className="group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-r dark:from-white dark:via-slate-100 dark:to-[#00F0FF]">
                CYBER<span className="text-[#00A6FF] dark:text-[#00F0FF]">FLIX</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#00A6FF] dark:text-[#00F0FF] uppercase font-bold -mt-1 opacity-90">
                Stream GenZ
              </span>
            </div>
          </Link>

          {/* Cụm 2: Desktop Navigation Links (Kèm Floating Active Neon Pill) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50/80 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/35 shadow-xs dark:shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Trang Chủ</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00F0FF] rounded-full shadow-[0_0_6px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/movies?type=SINGLE"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50/80 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/35 shadow-xs dark:shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Phim Lẻ</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00F0FF] rounded-full shadow-[0_0_6px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/movies?type=SERIES"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50/80 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/35 shadow-xs dark:shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Phim Bộ</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00F0FF] rounded-full shadow-[0_0_6px_#00F0FF]" />
                  )}
                </>
              )}
            </NavLink>

            {/* Thể Loại Dropdown */}
            <div className="relative" ref={genresDropdownRef}>
              <button
                type="button"
                onClick={() => setIsGenresOpen(!isGenresOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isGenresOpen
                    ? 'text-[#00F0FF] bg-blue-50/50 dark:bg-[#00F0FF]/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
                }`}
              >
                <span>Thể Loại</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isGenresOpen ? 'rotate-180 text-[#00F0FF]' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Menu Thả Kính Mờ */}
              {isGenresOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white/95 dark:bg-[#0d1224]/95 backdrop-blur-2xl border border-slate-200 dark:border-[#162038] shadow-2xl p-2.5 grid grid-cols-2 gap-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {GENRE_DROPDOWN_ITEMS.map((g) => (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => {
                        setIsGenresOpen(false);
                        navigate(`/movies?genre=${encodeURIComponent(g.name)}`);
                      }}
                      className="text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all group cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#00F0FF]">
                        #{g.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {g.desc}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Gói VIP PayOS Link */}
            <NavLink
              to="/vip"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-amber-600 dark:text-[#FFEE00] bg-amber-50/80 dark:bg-[#FFEE00]/15 border border-amber-300 dark:border-[#FFEE00]/40 shadow-xs dark:shadow-[0_0_12px_rgba(255,238,0,0.25)]'
                    : 'text-amber-600 dark:text-[#FFEE00] hover:bg-amber-50 dark:hover:bg-[#FFEE00]/10'
                }`
              }
            >
              <Crown size={15} className="text-amber-500 dark:text-[#FFEE00]" />
              <span>Gói VIP</span>
            </NavLink>
          </nav>

          {/* Cụm 3: Search Bar HUD + Theme Switcher + Auth Session */}
          <div className="flex items-center gap-2 sm:gap-3">
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block w-44 md:w-56 lg:w-68 transition-all duration-300 focus-within:w-52 md:focus-within:w-64 lg:focus-within:w-76"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Tìm phim, thể loại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/90 dark:bg-[#0d1224]/90 border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-9 pr-14 py-2 outline-none transition-all focus:shadow-[0_0_12px_rgba(0,240,255,0.25)]"
              />
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa từ khóa"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Mobile Search Button (Kính lúp mở Drawer / Tìm kiếm nhanh) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Tìm kiếm phim"
              className="sm:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            >
              <Search size={20} />
            </button>

            {/* Nút Chuyển Đổi Theme Sáng / Tối */}
            <ThemeToggle />

            {/* Cụm User Authentication / Profile Menu */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-10 h-10 rounded-xl bg-linear-to-tr from-[#00F0FF] to-[#9D00FF] p-0.5 shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer active:scale-95 flex items-center justify-center"
                  aria-label="Tài khoản cá nhân"
                >
                  <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center text-[#00F0FF]">
                    <User size={18} />
                  </div>
                </button>

                {/* Dropdown Menu User */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 dark:bg-[#0d1224]/95 backdrop-blur-2xl border border-slate-200 dark:border-[#162038] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-200/60 dark:border-white/10 mb-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Thành viên Cyberflix
                      </div>
                      <div className="text-[11px] text-[#00A6FF] dark:text-[#00F0FF] font-semibold flex items-center gap-1 mt-0.5">
                        <Sparkles size={11} /> Đã đăng nhập
                      </div>
                    </div>

                    <Link
                      to="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#00F0FF] transition-colors"
                    >
                      <User size={14} className="text-[#00F0FF]" /> Hồ Sơ & Cài Đặt
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-rose-500 transition-colors"
                    >
                      <Heart size={14} className="text-rose-500" /> Phim Yêu Thích
                    </Link>

                    <Link
                      to="/history"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-cyan-400 transition-colors"
                    >
                      <History size={14} className="text-cyan-400" /> Lịch Sử Xem
                    </Link>

                    <Link
                      to="/vip"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-amber-600 dark:text-[#FFEE00] hover:bg-amber-50 dark:hover:bg-[#FFEE00]/10 transition-colors"
                    >
                      <Crown size={14} /> Gói VIP PayOS
                    </Link>

                    <div className="border-t border-slate-200/60 dark:border-white/10 my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} /> Đăng Xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex"
                leftIcon={<User size={15} />}
                onClick={openLogin}
              >
                Đăng Nhập
              </Button>
            )}

            {/* Mobile Menu Toggle Button (Touch target >= 40x40px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Off-canvas Navigation Drawer trên Mobile & Tablet (< lg) */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        isAuthenticated={isAuthenticated}
        onOpenLogin={openLogin}
        onLogout={handleLogout}
      />
    </>
  );
};
