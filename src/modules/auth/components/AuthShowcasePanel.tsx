import React from 'react';
import { Film, Sparkles, Shield, Zap, Flame } from 'lucide-react';
import { AuthMode } from '../types/auth.types';

// Panel bên trái cho Desktop (khi ở chế độ Đăng Ký & Xác Thực OTP)
export const DesktopShowcaseLeft: React.FC<{ mode: AuthMode }> = ({ mode }) => {
  const isVerify = mode === 'verify_register';
  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
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
          {isVerify ? <Shield size={14} className="text-[#00F0FF]" /> : <Flame size={14} className="text-[#FFEE00]" />}
          <span>{isVerify ? 'Bảo Mật OTP 6 Số' : 'Đặc Quyền Thành Viên'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 max-w-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
            {isVerify ? 'BƯỚC 2: XÁC THỰC' : 'GIA NHẬP VŨ TRỤ'}
          </span>
        </div>

        <h3 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] leading-snug drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          {isVerify ? 'KÍCH HOẠT QUYỀN TRUY CẬP ĐIỆN ẢNH' : 'MỞ KHÓA THẾ GIỚI ĐIỆN ẢNH CYBERFLIX'}
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed opacity-90">
          {isVerify
            ? 'Mã OTP bảo mật 6 số được gửi trực tiếp đến hộp thư của bạn. Hoàn tất xác minh để bắt đầu xem phim.'
            : 'Trải nghiệm không giới hạn hàng ngàn giờ phim chiếu rạp 4K Ultra HD cùng công nghệ âm thanh vòm Dolby Atmos.'}
        </p>

        <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-[#FFEE00]" /> 4K Ultra HD
          </span>
          <span>•</span>
          <span>HLS 60 FPS</span>
          <span>•</span>
          <span>VietQR PayOS</span>
        </div>
      </div>
    </div>
  );
};

// Panel bên phải cho Desktop (khi ở chế độ Đăng Nhập & Quên Mật Khẩu)
export const DesktopShowcaseRight: React.FC<{ mode: AuthMode }> = ({ mode }) => {
  const isForgot = mode === 'forgot_email' || mode === 'forgot_reset';
  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
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
          {isForgot ? <Shield size={14} className="text-[#00F0FF]" /> : <Zap size={14} className="text-[#00F0FF]" />}
          <span>{isForgot ? 'Bảo Mật Đa Tầng' : 'Tốc Độ Cao 60 FPS'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 max-w-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
            {isForgot ? 'KHÔI PHỤC TRUY CẬP' : 'CHÀO MỪNG TRỞ LẠI'}
          </span>
        </div>

        <h3 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] leading-snug drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          {isForgot ? 'KHÔI PHỤC TRUY CẬP AN TOÀN TUYỆT ĐỐI' : 'TIẾP TỤC HÀNH TRÌNH STREAMING ĐỈNH CAO'}
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed opacity-90">
          {isForgot
            ? 'Hệ thống gửi mã xác minh tức thì qua dịch vụ email bảo mật cao. Khôi phục quyền truy cập chỉ trong vài bước.'
            : 'Đồng bộ lịch sử xem, tiếp tục xem từ giây cuối cùng trên mọi thiết bị và tận hưởng kho phim rạp độc quyền.'}
        </p>

        <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-[#FFEE00]" /> 4K Ultra HD
          </span>
          <span>•</span>
          <span>Đồng Bộ Tiến Độ</span>
          <span>•</span>
          <span>Gói VIP Rạp Phim</span>
        </div>
      </div>
    </div>
  );
};

// Header Banner cho Mobile & Tablet (Theo Đúng Thiết Kế Ảnh 2)
export const MobileHeaderBanner: React.FC<{ mode: AuthMode }> = ({ mode }) => {
  const getBannerInfo = () => {
    switch (mode) {
      case 'register':
        return {
          tag: 'GIA NHẬP VŨ TRỤ',
          title: 'ĐĂNG KÝ TÀI KHOẢN',
          badge: 'Bước 1/2',
          icon: <Flame size={13} className="text-[#FFEE00]" />,
        };
      case 'verify_register':
        return {
          tag: 'BẢO MẬT TÀI KHOẢN',
          title: 'XÁC THỰC MÃ OTP',
          badge: 'Bước 2/2',
          icon: <Shield size={13} className="text-[#00F0FF]" />,
        };
      case 'forgot_email':
        return {
          tag: 'QUÊN MẬT KHẨU',
          title: 'KHÔI PHỤC TÀI KHOẢN',
          badge: 'Nhập Email',
          icon: <Shield size={13} className="text-[#9D00FF]" />,
        };
      case 'forgot_reset':
        return {
          tag: 'THIẾT LẬP MỚI',
          title: 'ĐẶT LẠI MẬT KHẨU',
          badge: 'Mật Khẩu Mới',
          icon: <Shield size={13} className="text-[#00F0FF]" />,
        };
      case 'login':
      default:
        return {
          tag: 'CHÀO MỪNG TRỞ LẠI',
          title: 'ĐĂNG NHẬP CYBERFLIX',
          badge: 'Thành Viên',
          icon: <Zap size={13} className="text-[#00F0FF]" />,
        };
    }
  };

  const info = getBannerInfo();

  return (
    <div className="relative h-36 sm:h-40 w-full shrink-0 overflow-hidden bg-[#070913] p-4 flex flex-col justify-between select-none">
      {/* Background Image & Synthwave Grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"
          alt="Cyberpunk Cinema"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-[#9D00FF]/35 via-transparent to-[#00F0FF]/30" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
      </div>

      {/* Brand Logo & Tag */}
      <div className="relative z-10 flex items-center justify-between pr-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-[#00F0FF] to-[#9D00FF] p-0.5 shadow-[0_0_8px_#00F0FF]">
            <div className="w-full h-full bg-[#070913] rounded-[5px] flex items-center justify-center text-[#00F0FF]">
              <Film size={13} />
            </div>
          </div>
          <span className="text-xs font-black tracking-wider text-white">
            CYBER<span className="text-[#00F0FF]">FLIX</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-slate-200">
          {info.icon}
          <span>{info.badge}</span>
        </div>
      </div>

      {/* Title over Banner */}
      <div className="relative z-10 mb-2">
        <span className="text-[9px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
          {info.tag}
        </span>
        <h3 className="text-base sm:text-lg font-black uppercase text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
          {info.title}
        </h3>
      </div>
    </div>
  );
};
