import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, ShieldAlert } from 'lucide-react';
import { OtpSixBoxes } from './OtpSixBoxes';
import { Button } from '../../../components/ui/Button';
import { authService, getFriendlyErrorMessage } from '../services/authService';

interface ResetPasswordOtpFormProps {
  email: string;
  onBackToEmail: () => void;
  onSuccess: () => void;
}

export const ResetPasswordOtpForm: React.FC<ResetPasswordOtpFormProps> = ({
  email,
  onBackToEmail,
  onSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Vui lòng nhập đủ 6 chữ số mã OTP.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Xác nhận mật khẩu mới không trùng khớp.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authService.resetPassword({ email, otpCode, newPassword });
      onSuccess();
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Đặt lại mật khẩu thất bại. Vui lòng kiểm tra mã OTP.'));
      setOtp(Array(6).fill(''));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setResendSuccess('');
    try {
      await authService.forgotPassword({ email });
      setResendSuccess('Đã gửi lại mã OTP khôi phục mới.');
    } catch {
      setError('Không thể gửi lại mã, vui lòng thử lại sau.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-6 sm:px-10 py-6 bg-white dark:bg-[#0d1224] text-slate-900 dark:text-white transition-colors duration-300 overflow-y-auto">
      <div className="w-full max-w-sm my-auto space-y-4">
        {/* Header with Back button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToEmail}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Đổi email khác
          </button>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#9D00FF]/15 text-[#9D00FF] border border-[#9D00FF]/30 font-bold">
            Xác Minh & Đổi MK
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Thiết Lập Mật Khẩu Mới</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Nhập mã OTP gửi tới <strong className="text-slate-900 dark:text-[#00F0FF]">{email}</strong> và mật khẩu mới
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-in fade-in">
            {error}
          </div>
        )}
        {resendSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-in fade-in flex items-center gap-1.5">
            <CheckCircle2 size={15} /> {resendSuccess}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* OTP Boxes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Mã xác thực OTP 6 số
            </label>
            <OtpSixBoxes
              value={otp}
              onChange={setOtp}
              onResendOtp={handleResend}
              isResending={resending}
            />
          </div>

          {/* Mật khẩu mới */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Mật khẩu mới (ít nhất 8 ký tự)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#9D00FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-9 py-2 outline-none transition-all"
              />
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#9D00FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-9 py-2 outline-none transition-all"
              />
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="glow"
            className="w-full mt-2"
            isLoading={loading}
            disabled={otp.join('').length < 6}
          >
            LƯU MẬT KHẨU MỚI & ĐĂNG NHẬP
          </Button>
        </form>
        <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-[#162038]">
          Mật khẩu được mã hóa an toàn qua thuật toán BCrypt của Spring Boot
        </div>
      </div>
    </div>
  );
};
