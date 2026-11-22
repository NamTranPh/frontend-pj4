import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { authService } from '../services/authService';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess: (email: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ tất cả thông tin.');
      return;
    }

    if (password.length < 8) {
      setError('Mật khẩu bảo mật phải có ít nhất 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Xác nhận mật khẩu không trùng khớp.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authService.register({ name, email, password });
      onSuccess(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký không thành công.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-white dark:bg-[#0d1224] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="space-y-4">
        {/* Header Form */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Đăng Ký</span>
              <span className="w-2 h-2 rounded-full bg-[#FFEE00] shadow-[0_0_8px_#FFEE00]" />
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#00A6FF]/10 text-[#00A6FF] dark:text-[#00F0FF] border border-[#00A6FF]/30 font-bold">
              Bước 1/2
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tạo tài khoản thành viên để tận hưởng rạp phim tại gia
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-in fade-in">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Họ và tên */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Họ và tên
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Thành Nam"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2 outline-none transition-all"
              />
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Email đăng ký
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nam.cyber@example.com"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2 outline-none transition-all"
              />
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Mật khẩu (ít nhất 8 ký tự)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-9 py-2 outline-none transition-all"
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

          {/* Xác nhận mật khẩu */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-9 py-2 outline-none transition-all"
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
            variant="primary"
            className="w-full mt-2"
            isLoading={loading}
            rightIcon={<ArrowRight size={16} />}
          >
            TIẾP TỤC & NHẬN MÃ OTP
          </Button>
        </form>
      </div>

      {/* Switcher to Login */}
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-[#162038]">
        Đã có tài khoản CYBERFLIX?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#00A6FF] dark:text-[#00F0FF] font-black hover:underline cursor-pointer ml-1"
        >
          Đăng nhập ngay →
        </button>
      </div>
    </div>
  );
};
