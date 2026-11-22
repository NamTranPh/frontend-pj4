import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, KeyRound } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { authService } from '../services/authService';

interface ForgotPasswordEmailFormProps {
  onBackToLogin: () => void;
  onSuccess: (email: string) => void;
}

export const ForgotPasswordEmailForm: React.FC<ForgotPasswordEmailFormProps> = ({
  onBackToLogin,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Vui lòng nhập địa chỉ email.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authService.forgotPassword({ email });
      onSuccess(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể gửi mã khôi phục.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-white dark:bg-[#0d1224] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="space-y-6">
        {/* Header with Back button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToLogin}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Quay lại Đăng nhập
          </button>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#9D00FF]/15 text-[#9D00FF] border border-[#9D00FF]/30 font-bold">
            Khôi Phục
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Quên Mật Khẩu?</span>
            <KeyRound size={22} className="text-[#9D00FF]" />
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Nhập địa chỉ email đăng ký của bạn. Hệ thống sẽ gửi mã OTP 6 số để bạn thiết lập lại mật khẩu mới.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-in fade-in">
            {error}
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Email tài khoản của bạn
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#9D00FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all"
              />
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={loading}
            rightIcon={<ArrowRight size={16} />}
          >
            GỬI MÃ KHÔI PHỤC OTP
          </Button>
        </form>
      </div>

      <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-200 dark:border-[#162038]">
        Hệ thống gửi mã tự động qua dịch vụ Email SMTP bảo mật cao
      </div>
    </div>
  );
};
