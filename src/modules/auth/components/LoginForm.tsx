import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { authService } from '../services/authService';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onSwitchToForgotPassword,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authService.login({ email, password });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-white dark:bg-[#0d1224] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="space-y-6">
        {/* Header Form */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Đăng Nhập</span>
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Truy cập tài khoản CYBERFLIX để đồng bộ tiến độ xem phim
          </p>
        </div>

        {/* Error message alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold animate-in fade-in">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Địa chỉ Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              />
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-[#00A6FF] dark:text-[#00F0FF] text-[11px] font-bold hover:underline cursor-pointer"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] focus:border-[#00A6FF] dark:focus:border-[#00F0FF] text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-9 pr-10 py-2.5 outline-none transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="glow"
            className="w-full mt-2"
            isLoading={loading}
            leftIcon={<LogIn size={16} />}
          >
            VÀO XEM PHIM NGAY
          </Button>
        </form>
      </div>

      {/* Switcher to Register */}
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-[#162038]">
        Chưa có tài khoản CYBERFLIX?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#00A6FF] dark:text-[#00F0FF] font-black hover:underline cursor-pointer ml-1"
        >
          Đăng ký thành viên mới →
        </button>
      </div>
    </div>
  );
};
