import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { OtpSixBoxes } from './OtpSixBoxes';
import { Button } from '../../../components/ui/Button';
import { authService } from '../services/authService';

interface VerifyAccountOtpFormProps {
  email: string;
  onBackToRegister: () => void;
  onSuccess: () => void;
}

export const VerifyAccountOtpForm: React.FC<VerifyAccountOtpFormProps> = ({
  email,
  onBackToRegister,
  onSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Vui lòng nhập đầy đủ mã OTP 6 chữ số.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authService.verifyRegistration({ email, otpCode });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mã xác thực không hợp lệ hoặc đã hết hạn.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setResendSuccess('');
    try {
      await authService.resendRegistrationOtp(email);
      setResendSuccess('Đã gửi lại mã OTP mới vào hòm thư.');
    } catch {
      setError('Không thể gửi lại mã, vui lòng thử lại sau.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-white dark:bg-[#0d1224] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="space-y-5">
        {/* Header with Back button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToRegister}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00A6FF] dark:text-[#00F0FF] border border-[#00F0FF]/30 font-bold">
            Bước 2/2
          </span>
        </div>

        {/* Title & Email info */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Xác Thực Tài Khoản</span>
            <ShieldCheck size={22} className="text-[#00A6FF] dark:text-[#00F0FF]" />
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Mã OTP 6 số đã được gửi đến:{' '}
            <strong className="text-slate-900 dark:text-[#00F0FF] font-semibold">{email || 'email của bạn'}</strong>.
            Vui lòng kiểm tra hộp thư đến (hoặc thư rác).
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-in fade-in">
            {error}
          </div>
        )}
        {resendSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-in fade-in flex items-center gap-1.5">
            <CheckCircle2 size={16} /> {resendSuccess}
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleVerify} className="space-y-5">
          <OtpSixBoxes
            value={otp}
            onChange={setOtp}
            onResendOtp={handleResend}
            isResending={resending}
          />

          <Button
            type="submit"
            variant="glow"
            className="w-full"
            isLoading={loading}
            disabled={otp.join('').length < 6}
          >
            KÍCH HOẠT VÀ VÀO XEM PHIM
          </Button>
        </form>
      </div>

      <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-200 dark:border-[#162038]">
        Bảo mật 100% qua tiêu chuẩn JWT Token & mã OTP mã hóa
      </div>
    </div>
  );
};
