import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Film, Crown, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuthModal } from '../../modules/auth/context/AuthModalContext';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { openLogin } = useAuthModal();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#070913]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#162038] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#00F0FF] via-[#00A6FF] to-[#9D00FF] p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all">
            <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center text-[#00F0FF]">
              <Film size={22} className="group-hover:scale-110 transition-transform" />
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/30 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            Trang Chủ
          </NavLink>
          <NavLink
            to="/movies?type=SINGLE"
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/30 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            Phim Lẻ
          </NavLink>
          <NavLink
            to="/movies?type=SERIES"
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? 'text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 border border-blue-200 dark:border-[#00F0FF]/30 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            Phim Bộ
          </NavLink>
          <NavLink
            to="/vip"
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'text-amber-600 dark:text-[#FFEE00] bg-amber-50 dark:bg-[#FFEE00]/10 border border-amber-200 dark:border-[#FFEE00]/30 shadow-sm dark:shadow-[0_0_10px_rgba(255,238,0,0.2)]'
                  : 'text-amber-600 dark:text-[#FFEE00] hover:bg-amber-50 dark:hover:bg-[#FFEE00]/10'
              }`
            }
          >
            <Crown size={15} className="text-amber-500 dark:text-[#FFEE00]" />
            Gói VIP
          </NavLink>
        </nav>

        {/* Search Bar HUD + Theme Switcher + Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-40 md:w-56 lg:w-64">
            <input
              type="text"
              placeholder="Tìm phim, thể loại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 outline-none transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>

          {/* Nút Chuyển Đổi Theme Sáng / Tối */}
          <ThemeToggle />

          {/* User Sign In / Profile */}
          <Button
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex"
            leftIcon={<User size={15} />}
            onClick={openLogin}
          >
            Đăng Nhập
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#070913]/95 border-b border-slate-200 dark:border-[#162038] px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Tìm phim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] text-sm text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 outline-none"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>

          <div className="flex flex-col gap-1 text-sm font-semibold">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#00F0FF] hover:bg-slate-100 dark:hover:bg-white/5"
            >
              Trang Chủ
            </Link>
            <Link
              to="/movies?type=SINGLE"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#00F0FF] hover:bg-slate-100 dark:hover:bg-white/5"
            >
              Phim Lẻ
            </Link>
            <Link
              to="/movies?type=SERIES"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#00F0FF] hover:bg-slate-100 dark:hover:bg-white/5"
            >
              Phim Bộ
            </Link>
            <Link
              to="/vip"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-amber-600 dark:text-[#FFEE00] hover:bg-amber-50 dark:hover:bg-[#FFEE00]/10 flex items-center gap-2"
            >
              <Crown size={16} /> Gói VIP PayOS
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLogin();
              }}
              className="text-left px-3 py-2 rounded-lg text-blue-600 dark:text-[#00F0FF] hover:bg-blue-50 dark:hover:bg-white/5 font-semibold cursor-pointer"
            >
              Đăng Nhập Tài Khoản
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
