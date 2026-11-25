import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Crown,
  Shield,
  Key,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Check,
  ArrowLeft,
  Tv,
  Film,
  Heart,
  History,
  Lock,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { showToast, showConfirmDialog } from '../../../utils/alert';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'membership' | 'security'>('profile');

  // Form Profile State
  const [fullName, setFullName] = useState<string>('Nguyễn Thành Nam');
  const [email] = useState<string>('thanhnam.cyber@gmail.com');
  const [phone, setPhone] = useState<string>('0987654321');
  const [birthday, setBirthday] = useState<string>('2002-08-15');

  // Form Password State
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast.error('Họ và tên không được để trống!');
      return;
    }
    showToast.success('Đã cập nhật thông tin hồ sơ thành công!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast.error('Vui lòng điền đầy đủ các trường mật khẩu!');
      return;
    }
    if (newPassword.length < 6) {
      showToast.error('Mật khẩu mới phải có tối thiểu 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast.error('Xác nhận mật khẩu mới không trùng khớp!');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast.success('Đổi mật khẩu thành công! Hãy dùng mật khẩu mới cho lần đăng nhập sau.');
  };

  const handleLogout = async () => {
    const res = await showConfirmDialog({
      title: 'Đăng Xuất Tài Khoản?',
      text: 'Bạn sẽ cần đăng nhập lại để tiếp tục xem phim 4K và đồng bộ tiến độ cá nhân.',
      confirmText: 'Đăng Xuất',
      cancelText: 'Hủy',
      icon: 'warning',
    });

    if (res.isConfirmed) {
      localStorage.removeItem('accessToken');
      showToast.info('Đã đăng xuất khỏi tài khoản.');
      navigate('/');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Thanh Điều Hướng & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-[#162038] pb-4">
        <Link
          to="/"
          className="hover:text-slate-900 dark:hover:text-[#00F0FF] transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Trang Chủ
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-bold">Hồ Sơ & Cài Đặt Tài Khoản</span>
      </div>

      {/* Layout 2 Cột Chuẩn Điện Ảnh */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CỘT TRÁI: THẺ HỒ SƠ & TRẠNG THÁI (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-xl text-center flex flex-col items-center gap-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00F0FF]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Avatar Viền Neon Cyan */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-linear-to-tr from-[#00A6FF] to-[#00F0FF] p-0.5 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop"
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#070913] border-2 border-[#00F0FF] flex items-center justify-center text-[#00F0FF]">
                <Crown size={14} />
              </div>
            </div>

            {/* Tên & Gói VIP */}
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{fullName}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
              <div className="pt-2 flex items-center justify-center gap-1.5">
                <Badge variant="vip">VIP 4K Ultra HD</Badge>
                <Badge variant="cyan">GenZ Pro</Badge>
              </div>
            </div>

            {/* Thống Kê Nhanh */}
            <div className="grid grid-cols-2 gap-3 w-full pt-4 border-t border-slate-100 dark:border-white/5">
              <Link
                to="/favorites"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-rose-500/10 border border-slate-200 dark:border-white/10 transition-colors text-center cursor-pointer group"
              >
                <div className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-rose-500 flex items-center justify-center gap-1">
                  <Heart size={14} className="text-rose-500 fill-rose-500" />
                  <span>Bộ Sưu Tập</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Phim Yêu Thích</div>
              </Link>

              <Link
                to="/history"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-cyan-500/10 border border-slate-200 dark:border-white/10 transition-colors text-center cursor-pointer group"
              >
                <div className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-[#00F0FF] flex items-center justify-center gap-1">
                  <History size={14} className="text-[#00F0FF]" />
                  <span>Tiếp Tục Xem</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Lịch Sử Phát</div>
              </Link>
            </div>

            {/* Nút Đăng Xuất */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full min-h-[42px] rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <LogOut size={15} />
              <span>Đăng Xuất Tài Khoản</span>
            </Button>
          </div>
        </div>

        {/* CỘT PHẢI: NỘI DUNG QUẢN LÝ THEO TAB (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs Menu */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038]">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex-1 min-h-[40px] px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-[#070913] text-[#00A6FF] dark:text-[#00F0FF] shadow-md border border-slate-200 dark:border-[#00F0FF]/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <User size={15} />
              <span>Hồ Sơ Cá Nhân</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('membership')}
              className={`flex-1 min-h-[40px] px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'membership'
                  ? 'bg-white dark:bg-[#070913] text-amber-500 dark:text-[#FFEE00] shadow-md border border-slate-200 dark:border-[#FFEE00]/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Crown size={15} />
              <span>Gói VIP & Dịch Vụ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`flex-1 min-h-[40px] px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-white dark:bg-[#070913] text-rose-500 dark:text-rose-400 shadow-md border border-slate-200 dark:border-rose-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Shield size={15} />
              <span>Bảo Mật & Mật Khẩu</span>
            </button>
          </div>

          {/* TAB 1: HỒ SƠ CÁ NHÂN */}
          {activeTab === 'profile' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Thông Tin Tài Khoản
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cập nhật họ tên và thông tin liên lạc để nhận thông báo phim mới nhất
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User size={13} className="text-[#00F0FF]" /> Họ và tên:
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-[#00F0FF] transition-colors"
                      placeholder="Nhập họ và tên..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mail size={13} className="text-[#00F0FF]" /> Địa chỉ Email:
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Phone size={13} className="text-[#00F0FF]" /> Số điện thoại:
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-[#00F0FF] transition-colors"
                      placeholder="09xx xxx xxx"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#00F0FF]" /> Ngày sinh:
                    </label>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-[#00F0FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="min-h-[42px] px-6 text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
                  >
                    Lưu Thay Đổi
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: GÓI VIP & QUYỀN LỢI */}
          {activeTab === 'membership' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Crown size={18} className="text-[#FFEE00]" /> Gói Thành Viên Hiện Tại
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Bạn đang sử dụng gói xem phim chất lượng cao cấp nhất trên Cyberflix
                  </p>
                </div>
                <Link to="/vip">
                  <Button
                    variant="primary"
                    className="min-h-[40px] px-5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,238,0,0.3)] bg-linear-to-r from-amber-500 to-[#FFEE00] text-slate-950 cursor-pointer"
                  >
                    Gia Hạn Gói VIP
                  </Button>
                </Link>
              </div>

              {/* Thẻ Quyền Lợi VIP */}
              <div className="p-6 rounded-2xl bg-linear-to-br from-amber-500/10 via-transparent to-[#00F0FF]/10 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500 dark:text-[#FFEE00]">
                    Gói 1 Năm - VIP 4K Ultra HD
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    Đang Hoạt Động
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  Hạn sử dụng: 25/12/2026
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#00F0FF]" /> Xem chuẩn HLS 4K Ultra HD & 60fps
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#00F0FF]" /> Không quảng cáo làm phiền
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#00F0FF]" /> Âm thanh Dolby Atmos sống động
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#00F0FF]" /> Đăng nhập cùng lúc 4 thiết bị
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BẢO MẬT & ĐỔI MẬT KHẨU */}
          {activeTab === 'security' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Lock size={18} className="text-rose-500" /> Đổi Mật Khẩu Đăng Nhập
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Để bảo mật tài khoản, vui lòng sử dụng mật khẩu có tối thiểu 6 ký tự
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mật khẩu hiện tại:
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-rose-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-[#00F0FF] transition-colors"
                    placeholder="Ít nhất 6 ký tự..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Xác nhận mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#070913] border border-slate-200 dark:border-[#162038] text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-[#00F0FF] transition-colors"
                    placeholder="Nhập lại mật khẩu mới..."
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="danger"
                    className="min-h-[42px] px-6 text-xs font-bold shadow-md cursor-pointer"
                  >
                    Xác Nhận Đổi Mật Khẩu
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
