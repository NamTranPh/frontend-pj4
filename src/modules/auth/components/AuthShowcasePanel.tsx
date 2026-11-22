import React from 'react';
import { Film, Sparkles, Shield, Zap, Flame } from 'lucide-react';
import { AuthMode } from '../types/auth.types';

interface AuthShowcasePanelProps {
  mode: AuthMode;
}

export const AuthShowcasePanel: React.FC<AuthShowcasePanelProps> = ({ mode }) => {
  const getShowcaseContent = () => {
    switch (mode) {
      case 'register':
      case 'verify_register':
        return {
          tag: 'GIA NHẬP VŨ TRỤ',
          title: 'MỞ KHÓA THẾ GIỚI ĐIỆN ẢNH CYBERFLIX',
          desc: 'Trải nghiệm không giới hạn hàng ngàn giờ phim chiếu rạp 4K Ultra HD cùng công nghệ âm thanh vòm Dolby Atmos.',
          badge: 'Đặc Quyền Thành Viên Mới',
          icon: <Flame size={16} className="text-[#FFEE00]" />,
          image: '/img/banner/one_piece_film_red/logo.png',
        };
      case 'forgot_email':
      case 'forgot_reset':
        return {
          tag: 'BẢO MẬT ĐA TẦNG',
          title: 'KHÔI PHỤC TRUY CẬP AN TOÀN TUYỆT ĐỐI',
          desc: 'Mã xác thực OTP gửi trực tiếp tới email đăng ký của bạn. Khôi phục quyền truy cập nhanh chóng chỉ trong 60 giây.',
          badge: 'Bảo Mật Thời Gian Thực',
          icon: <Shield size={16} className="text-[#00F0FF]" />,
          image: '/img/banner/chu_thuat_hoi_chien/chu_thuat_hoi_chien.png',
        };
      case 'login':
      default:
        return {
          tag: 'CHÀO MỪNG TRỞ LẠI',
          title: 'TIẾP TỤC HÀNH TRÌNH STREAMING ĐỈNH CAO',
          desc: 'Đồng bộ lịch sử xem, tiếp tục xem từ giây cuối cùng trên mọi thiết bị và tận hưởng kho phim rạp độc quyền.',
          badge: 'Tốc Độ Cao 60 FPS',
          icon: <Zap size={16} className="text-[#00F0FF]" />,
          image: '/img/banner/your_name/Your_name_movie_logo.png',
        };
    }
  };

  const content = getShowcaseContent();

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 overflow-hidden bg-[#070913] text-white select-none">
      {/* Background Image & Cyberpunk Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop"
          alt="Cyberpunk Cinema"
          className="w-full h-full object-cover object-center scale-105 opacity-40"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-[#9D00FF]/25 via-transparent to-[#00F0FF]/25" />
        {/* Synthwave grid lines */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
      </div>

      {/* Top Header: Logo & Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#00F0FF] to-[#9D00FF] p-0.5 shadow-[0_0_12px_#00F0FF]">
            <div className="w-full h-full bg-[#070913] rounded-md flex items-center justify-center text-[#00F0FF]">
              <Film size={16} />
            </div>
          </div>
          <span className="text-sm font-black tracking-wider text-white">
            CYBER<span className="text-[#00F0FF]">FLIX</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-slate-200">
          {content.icon}
          <span>{content.badge}</span>
        </div>
      </div>

      {/* Bottom Content: Typography */}
      <div className="relative z-10 space-y-3 max-w-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
            {content.tag}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] leading-snug drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          {content.title}
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed opacity-90">
          {content.desc}
        </p>

        {/* Feature Highlights */}
        <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-[#FFEE00]" /> 4K Ultra HD
          </span>
          <span>•</span>
          <span>HLS Adaptive Bitrate</span>
          <span>•</span>
          <span>VietQR PayOS</span>
        </div>
      </div>
    </div>
  );
};
