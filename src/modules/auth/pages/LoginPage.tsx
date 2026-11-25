import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('accessToken', 'mock_jwt_cyber_token_2026');
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#070913]">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#0d1224] border border-[#162038] shadow-[0_0_35px_rgba(0,240,255,0.2)] space-y-6 relative overflow-hidden">
        {/* Lớp phủ phát sáng */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#00F0FF]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#00F0FF] to-[#9D00FF] p-0.5 mx-auto shadow-[0_0_15px_#00F0FF]">
            <div className="w-full h-full bg-[#070913] rounded-[14px] flex items-center justify-center text-[#00F0FF]">
              <Film size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Đăng Nhập CYBERFLIX
          </h2>
          <p className="text-xs text-slate-400">
            Truy cập tài khoản để đồng bộ tiến độ xem và gói VIP
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email hoặc Tên tài khoản</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cyberuser@example.com"
                className="w-full bg-[#070913] border border-[#162038] focus:border-[#00F0FF] text-xs text-slate-100 rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              />
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Mật khẩu</label>
              <a href="#forgot" className="text-[#00F0FF] hover:underline text-[11px]">
                Quên mật khẩu?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#070913] border border-[#162038] focus:border-[#00F0FF] text-xs text-slate-100 rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
            </div>
          </div>

          <Button type="submit" variant="glow" className="w-full" isLoading={loading}>
            VÀO XEM PHIM
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-[#162038]">
          Chưa có tài khoản?{' '}
          <a href="#register" className="text-[#00F0FF] font-bold hover:underline">
            Đăng ký thành viên mới
          </a>
        </div>
      </div>
    </div>
  );
};
