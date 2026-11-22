import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AuthMode } from '../types/auth.types';
import { AuthShowcasePanel } from './AuthShowcasePanel';
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

  // Đồng bộ mode khi mở lại modal
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
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

  // Quy tắc vị trí Showcase:
  // - Đăng ký (register) & Xác thực tài khoản (verify_register): Showcase ở BÊN TRÁI
  // - Đăng nhập (login), Quên MK (forgot_email) & Đặt lại MK (forgot_reset): Showcase ở BÊN PHẢI
  const isShowcaseOnLeft = mode === 'register' || mode === 'verify_register';

  const handleRegisterSuccess = (email: string) => {
    setAuthEmail(email);
    setMode('verify_register');
  };

  const handleForgotPasswordEmailSuccess = (email: string) => {
    setAuthEmail(email);
    setMode('forgot_reset');
  };

  const handleAuthCompleted = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Double-Panel Sliding Modal Container */}
      <div
        className="relative z-10 w-full max-w-4xl min-h-[580px] h-[600px] max-h-[92vh] rounded-3xl overflow-hidden bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#00F0FF]/30 shadow-2xl dark:shadow-[0_0_50px_rgba(0,240,255,0.25)] flex transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút Đóng X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-md active:scale-90"
          title="Đóng cửa sổ"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        {/* 1. TẤM PANEL ẢNH NGHỆ THUẬT SHOWCASE (TRƯỢT MƯỢT MÀ QUA LẠI) */}
        <div
          className={`hidden md:block w-1/2 h-full absolute top-0 bottom-0 z-20 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ease-in-out ${
            isShowcaseOnLeft
              ? 'left-0 translate-x-0'
              : 'left-0 translate-x-full'
          }`}
        >
          <AuthShowcasePanel mode={mode} />
        </div>

        {/* 2. KHỐI FORM NHẬP LIỆU (TRƯỢT ĐỐI XỨNG NGƯỢC HƯỚNG SHOWCASE) */}
        <div
          className={`w-full md:w-1/2 h-full absolute top-0 bottom-0 z-10 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ease-in-out ${
            isShowcaseOnLeft
              ? 'left-0 md:translate-x-full'
              : 'left-0 md:translate-x-0'
          }`}
        >
          {mode === 'login' && (
            <LoginForm
              onSwitchToRegister={() => setMode('register')}
              onSwitchToForgotPassword={() => setMode('forgot_email')}
              onSuccess={handleAuthCompleted}
            />
          )}

          {mode === 'register' && (
            <RegisterForm
              onSwitchToLogin={() => setMode('login')}
              onSuccess={handleRegisterSuccess}
            />
          )}

          {mode === 'verify_register' && (
            <VerifyAccountOtpForm
              email={authEmail}
              onBackToRegister={() => setMode('register')}
              onSuccess={handleAuthCompleted}
            />
          )}

          {mode === 'forgot_email' && (
            <ForgotPasswordEmailForm
              onBackToLogin={() => setMode('login')}
              onSuccess={handleForgotPasswordEmailSuccess}
            />
          )}

          {mode === 'forgot_reset' && (
            <ResetPasswordOtpForm
              email={authEmail}
              onBackToEmail={() => setMode('forgot_email')}
              onSuccess={() => setMode('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
