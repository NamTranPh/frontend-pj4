import React from 'react';
import { Film, Shield, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#070913] border-t border-slate-200 dark:border-[#162038] text-slate-600 dark:text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden transition-colors duration-300">
      {/* Glow gradient background chìm */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-linear-to-t from-[#00A6FF]/5 dark:from-[#00F0FF]/5 via-[#9D00FF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#00F0FF] to-[#9D00FF] p-0.5">
              <div className="w-full h-full bg-[#070913] rounded-md flex items-center justify-center text-[#00F0FF]">
                <Film size={18} />
              </div>
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              CYBER<span className="text-[#00A6FF] dark:text-[#00F0FF]">FLIX</span>
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Nền tảng streaming phim điện ảnh thế hệ mới, tối ưu hóa công nghệ HLS Adaptive Bitrate và hệ thống thanh toán VietQR PayOS tự động.
          </p>
        </div>

        {/* Links Col 1 */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-200 font-bold uppercase tracking-wider mb-3 text-xs">Khám Phá Phim</h4>
          <ul className="space-y-2">
            <li><Link to="/movies?type=SINGLE" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Phim Lẻ Chiếu Rạp</Link></li>
            <li><Link to="/movies?type=SERIES" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Phim Bộ Đặc Sắc</Link></li>
            <li><Link to="/movies?genre=Anime" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Anime Mới Nhất</Link></li>
            <li><Link to="/movies?genre=Hành Động" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Hành Động Cyberpunk</Link></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-200 font-bold uppercase tracking-wider mb-3 text-xs">Hỗ Trợ & VIP</h4>
          <ul className="space-y-2">
            <li><Link to="/vip" className="text-amber-600 dark:text-[#FFEE00] hover:underline font-semibold">Đặc Quyền Hội Viên VIP</Link></li>
            <li><a href="#rules" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Điều Khoản Dịch Vụ</a></li>
            <li><a href="#privacy" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Chính Sách Bảo Mật</a></li>
            <li><a href="#speed" className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] transition-colors">Kiểm Tra Tốc Độ Mạng</a></li>
          </ul>
        </div>

        {/* Tech Highlights */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-200 font-bold uppercase tracking-wider mb-3 text-xs">Công Nghệ & Bảo Mật</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Zap size={15} className="text-[#00A6FF] dark:text-[#00F0FF]" />
              <span>HLS Adaptive Bitrate 4K</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Shield size={15} className="text-[#00A6FF]" />
              <span>Bảo mật Token Playback MinIO</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Sparkles size={15} className="text-amber-500 dark:text-[#FFEE00]" />
              <span>Kích hoạt PayOS tự động 100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 dark:border-[#162038] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-slate-500">
          © {new Date().getFullYear()} CYBERFLIX. Bản quyền thuộc về Đồ Án Kỹ Thuật Spring Boot & React 19.
        </p>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>React 19 & Vite 8</span>
          <span>•</span>
          <span>Tailwind CSS v4</span>
          <span>•</span>
          <span className="text-[#00A6FF] dark:text-[#00F0FF]">Cyberpunk GenZ Theme</span>
        </div>
      </div>
    </footer>
  );
};
