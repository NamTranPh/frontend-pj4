import { Mail, MessageSquare, Phone, Send, SquareFunction } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/95 dark:bg-[#070913]/95 border-t border-slate-200 dark:border-[#162038] text-slate-600 dark:text-slate-400 text-xs py-14 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden transition-colors duration-300">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-[#00F0FF]/35 via-[#9D00FF]/30 to-transparent pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-linear-to-t from-[#00A6FF]/5 dark:from-[#00F0FF]/5 via-[#9D00FF]/5 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12 relative z-10">
        {/* Cột 1 */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-15 h-15">
              <img src="/logo.png" alt="Logo" className="object-contain" />
            </div>
            <span className="text-3xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-wider">
              FUSE
              <span className="text-[#00A6FF] dark:text-[#00F0FF]">FLIX</span>
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Chúng tôi là một nền tảng streaming phim trực tuyến dành cho thế hệ
            GenZ, cung cấp trải nghiệm xem phim chất lượng cao với công nghệ
            tiên tiến và cộng đồng sôi động.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-100 font-black uppercase tracking-wider mb-4 text-xs flex items-center">
            <span>Khám Phá</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link
                to="/movies?type=SINGLE"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Phim Lẻ Đặc Sắc
              </Link>
            </li>
            <li>
              <Link
                to="/movies?type=SERIES"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Phim Bộ Truyền Hình Đặc Sắc
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Bảng Xếp Hạng Thịnh Hành
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-100 font-black uppercase tracking-wider mb-4 text-xs flex items-center">
            <span>Hội Viên VIP & Trợ Giúp</span>
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link
                to="/vip"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Đặc Quyền Hội Viên VIP PayOS
              </Link>
            </li>
            <li>
              <a
                href="#rules"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Điều Khoản Dịch Vụ
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Chính Sách Bảo Mật Dữ Liệu
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-[#00A6FF] dark:hover:text-[#00F0FF] hover:translate-x-1 inline-block transition-all"
              >
                Câu Hỏi Thường Gặp (FAQ)
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 4*/}
        <div className="space-y-4">
          <h4 className="text-slate-900 dark:text-slate-100 font-black uppercase tracking-wider mb-4 text-xs flex items-center">
            Thông tin & Cộng đồng
          </h4>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-[#00F0FF]/15 flex items-center justify-center text-[#00A6FF] dark:text-[#00F0FF] shrink-0">
                <Phone size={14} />
              </div>
              <Link
                to="tel:0869295732"
                className="hover:text-cyan-400 font-semibold transition-all"
              >
                0869295732
              </Link>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-purple-500/10 dark:bg-[#9D00FF]/15 flex items-center justify-center text-[#9D00FF] shrink-0">
                <Mail size={14} />
              </div>
              <Link
                to="mailto:admin@gmail.com"
                className="hover:text-purple-400 font-semibold transition-all"
              >
                admin@gmail.com
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[12px] text-slate-400 dark:text-slate-500 block mb-2 font-medium">
              Tham gia cộng đồng GenZ:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord Community"
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
              >
                <MessageSquare size={15} />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram Channel"
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#00A6FF] hover:border-[#00A6FF]/50 hover:shadow-[0_0_10px_rgba(0,166,255,0.3)] transition-all cursor-pointer"
              >
                <Send size={15} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#00A6FF] hover:border-[#00A6FF]/50 hover:shadow-[0_0_10px_rgba(0,166,255,0.3)] transition-all cursor-pointer"
              >
                <SquareFunction size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-300 dark:border-[#162038] flex flex-col items-center justify-center text-center sm:text-left relative z-10 gap-1.5">
        <span className="text-slate-500 dark:text-slate-400 text-xs">
          Người đại diện: Trần Phương Nam
        </span>
        <span className="text-slate-500 dark:text-slate-400 text-xs">
          © {new Date().getFullYear()} FUSEFLIX. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
