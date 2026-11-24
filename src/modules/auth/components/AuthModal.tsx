import React, { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { AuthMode } from '../types/auth.types';
import {
  DesktopShowcaseLeft,
  DesktopShowcaseRight,
  MobileHeaderBanner,
} from './AuthShowcasePanel';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { VerifyAccountOtpForm } from './VerifyAccountOtpForm';
import { ForgotPasswordEmailForm } from './ForgotPasswordEmailForm';
import { ResetPasswordOtpForm } from './ResetPasswordOtpForm';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Chuyển mode mượt mà với nhịp mờ dần rồi hiện lại (Fade-out -> Fade-in)
  const switchMode = useCallback(
    (newMode: AuthMode) => {
      if (newMode === mode || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setMode(newMode);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 40);
      }, 160);
    },
    [mode, isTransitioning]
  );

  // Đồng bộ mode khi mở lại modal
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsTransitioning(false);
    }
  }, [isOpen, initialMode]);

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Quy tắc vị trí Showcase Desktop:
  // - Đăng ký (register) & Xác thực tài khoản (verify_register): Showcase ở BÊN TRÁI
  // - Đăng nhập (login), Quên MK (forgot_email) & Đặt lại MK (forgot_reset): Showcase ở BÊN PHẢI
  const isShowcaseOnLeft = mode === 'register' || mode === 'verify_register';

  const handleRegisterSuccess = (email: string) => {
    setAuthEmail(email);
    switchMode('verify_register');
  };

  const handleForgotPasswordEmailSuccess = (email: string) => {
    setAuthEmail(email);
    switchMode('forgot_reset');
  };

  const handleAuthCompleted = () => {
    onClose();
  };

  const renderActiveForm = () => {
    switch (mode) {
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => switchMode('login')}
            onSuccess={handleRegisterSuccess}
          />
        );
      case 'verify_register':
        return (
          <VerifyAccountOtpForm
            email={authEmail}
            onBackToRegister={() => switchMode('register')}
            onSuccess={handleAuthCompleted}
          />
        );
      case 'forgot_email':
        return (
          <ForgotPasswordEmailForm
            onBackToLogin={() => switchMode('login')}
            onSuccess={handleForgotPasswordEmailSuccess}
          />
        );
      case 'forgot_reset':
        return (
          <ResetPasswordOtpForm
            email={authEmail}
            onBackToEmail={() => switchMode('forgot_email')}
            onSuccess={() => switchMode('login')}
          />
        );
      case 'login':
      default:
        return (
          <LoginForm
            onSwitchToRegister={() => switchMode('register')}
            onSwitchToForgotPassword={() => switchMode('forgot_email')}
            onSuccess={handleAuthCompleted}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Container: Hỗ trợ linh hoạt Desktop (Slider 2 nửa) và Mobile (Card lồng Banner) */}
      <div
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-4xl min-h-[560px] md:h-[620px] max-h-[94vh] rounded-3xl overflow-hidden bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#00F0FF]/30 shadow-2xl dark:shadow-[0_0_50px_rgba(0,240,255,0.25)] flex transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút Đóng X dùng chung */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 md:top-4 md:right-4 z-40 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-md active:scale-90"
          title="Đóng cửa sổ"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        {/* ========================================================= */}
        {/* A. GIAO DIỆN DESKTOP (>= md): TẤM PANEL ẢNH 50% GPU TRANSLATE + CROSSFADE */}
        {/* ========================================================= */}

        {/* 1. Tấm Panel Ảnh 50% Chiều Rộng (Trượt mượt mà bằng GPU transform) */}
        <div
          className={`hidden md:block absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden z-20 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) bg-[#070913] text-white select-none ${
            isShowcaseOnLeft
              ? 'translate-x-0 rounded-r-[50px] lg:rounded-r-[70px] rounded-l-3xl shadow-[15px_0_35px_rgba(0,0,0,0.4)]'
              : 'translate-x-full rounded-l-[50px] lg:rounded-l-[70px] rounded-r-3xl shadow-[-15px_0_35px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Ảnh nền giữ nguyên kích thước khung 100% sắc nét, tỷ lệ chuẩn không phóng to hay crop méo */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop"
              alt="Cyberpunk Cinema"
              className="w-full h-full object-cover object-center opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-br from-[#9D00FF]/30 via-transparent to-[#00F0FF]/30" />
            <div className="absolute bottom-0 inset-x-0 h-36 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
          </div>

          {/* Nội dung bên trong tấm ảnh: Mờ dần rồi hiện lại (Fade-out -> Fade-in) khi đổi mode */}
          <div
            className={`relative z-10 w-full h-full transition-all duration-200 ease-out ${
              isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Panel Showcase Đăng Ký / Xác Thực OTP (Bên Trái) */}
            <div
              className={`w-full h-full transition-all duration-500 ease-in-out absolute inset-0 p-8 lg:p-10 ${
                isShowcaseOnLeft
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <DesktopShowcaseLeft mode={mode} />
            </div>

            {/* Panel Showcase Đăng Nhập / Quên MK (Bên Phải) */}
            <div
              className={`w-full h-full transition-all duration-500 ease-in-out absolute inset-0 p-8 lg:p-10 ${
                !isShowcaseOnLeft
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <DesktopShowcaseRight mode={mode} />
            </div>
          </div>
        </div>

        {/* 2. Khối Form Nhập Liệu Desktop (Trượt Đối Xứng với Panel Ảnh + Mờ Dần & Hiện Lại) */}
        <div
          className={`hidden md:block w-1/2 h-full absolute top-0 bottom-0 left-0 z-10 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
            isShowcaseOnLeft ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Lớp wrapper hỗ trợ hiệu ứng mờ dần và hiện lại mượt mà khi đổi giữa các form */}
          <div
            className={`w-full h-full transition-all duration-200 ease-out ${
              isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            {renderActiveForm()}
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. GIAO DIỆN MOBILE & TABLET (< md): CHUẨN CARD LỒNG BANNER (THEO ẢNH 2) */}
        {/* ========================================================= */}
        <div className="flex flex-col md:hidden w-full h-full max-h-[94vh] overflow-hidden bg-slate-900 rounded-3xl">
          {/* 1. Header Banner Phía Trên (Mờ nhẹ khi đổi mode) */}
          <div
            className={`transition-opacity duration-200 ease-out ${
              isTransitioning ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <MobileHeaderBanner mode={mode} />
          </div>

          {/* 2. Card Form Bo Cong Lồng Lên Chân Banner (Bo cong top rounded-t-[32px] chuẩn Ảnh 2 + Mờ dần & Hiện lại) */}
          <div className="relative -mt-6 z-10 flex-1 rounded-t-[32px] sm:rounded-t-[36px] bg-white dark:bg-[#0d1224] p-5 sm:p-6 overflow-y-auto shadow-2xl transition-colors duration-300">
            <div
              className={`transition-all duration-200 ease-out ${
                isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
              }`}
            >
              {renderActiveForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};