import React, { useState } from 'react';
import { Crown, Check, QrCode, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuthModal } from '../../auth/context/AuthModalContext';

export const VipPricingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const { openLogin } = useAuthModal();

  const plans = [
    {
      id: 'plan-basic',
      name: 'GÓI TIÊU CHUẨN',
      price: '59,000 đ',
      duration: '1 Tháng',
      description: 'Phù hợp trải nghiệm phim Full HD trên 1 thiết bị cá nhân',
      features: [
        'Chất lượng Full HD 1080p',
        'Không quảng cáo ngắt quãng',
        'Kho phim lẻ và phim bộ cơ bản',
        '1 Thiết bị xem cùng lúc',
      ],
      isPopular: false,
    },
    {
      id: 'plan-vip-pro',
      name: 'GÓI VIP ĐIỆN ẢNH (PRO)',
      price: '149,000 đ',
      duration: '3 Tháng',
      description: 'Gói được yêu thích nhất: Xem 4K Ultra HD và âm thanh Dolby',
      features: [
        'Chất lượng 4K Ultra HD & HDR',
        'Âm thanh vòm Dolby Atmos',
        'Toàn quyền truy cập phim VIP độc quyền',
        '3 Thiết bị xem cùng lúc',
        'Tải phim xem offline không giới hạn',
      ],
      isPopular: true,
    },
    {
      id: 'plan-vip-year',
      name: 'GÓI VIP TRỌN NĂM',
      price: '499,000 đ',
      duration: '12 Tháng',
      description: 'Tiết kiệm 35% chi phí, quyền lợi cao cấp nhất cho gia đình',
      features: [
        'Mọi đặc quyền của gói VIP Pro',
        '5 Thiết bị xem cùng lúc',
        'Huy hiệu VIP Vàng trên tài khoản',
        'Hỗ trợ kỹ thuật ưu tiên 24/7',
      ],
      isPopular: false,
    },
  ];

  const handleOpenPay = (planId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      openLogin();
      return;
    }
    setSelectedPlan(planId);
    setShowQrModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Tiêu đề trang */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#FFEE00]/15 border border-amber-300 dark:border-[#FFEE00]/30 text-amber-600 dark:text-[#FFEE00] text-xs font-bold uppercase tracking-wider">
          <Crown size={15} /> Nâng Cấp Hội Viên VIP
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          Thanh Toán VietQR Tự Động Với PayOS
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Kích hoạt ngay lập tức qua mã QR ngân hàng nội địa. Không cần thẻ tín dụng, quét mã là xong.
        </p>
      </div>

      {/* Bảng giá 3 Gói */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.isPopular
                ? 'bg-linear-to-b from-purple-50/80 via-white to-amber-50/60 dark:from-[#1b1236] dark:to-[#0d1224] border-2 border-amber-400 dark:border-[#FFEE00] shadow-xl dark:shadow-[0_0_35px_rgba(255,238,0,0.25)] scale-100 md:scale-105 z-10'
                : 'bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/40 shadow-sm'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFEE00] text-black font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-[0_0_12px_#FFEE00]">
                Phổ Biến Nhất
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-[#162038]">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{plan.price}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Thời hạn: {plan.duration}</div>
              </div>

              {/* Danh Sách Quyền Lợi */}
              <ul className="space-y-2.5 pt-4">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check size={16} className={plan.isPopular ? 'text-amber-500 dark:text-[#FFEE00] shrink-0' : 'text-[#00A6FF] dark:text-[#00F0FF] shrink-0'} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Button
                variant={plan.isPopular ? 'glow' : 'secondary'}
                className="w-full"
                onClick={() => handleOpenPay(plan.id)}
              >
                Chọn Gói Này
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Quét Mã VietQR PayOS */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0d1224] border border-slate-200 dark:border-[#00F0FF]/40 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl dark:shadow-[0_0_40px_rgba(0,240,255,0.3)] relative">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
              aria-label="Đóng cửa sổ"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-[#00F0FF]/15 text-[#00A6FF] dark:text-[#00F0FF] mx-auto flex items-center justify-center mb-2">
                <QrCode size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quét Mã VietQR PayOS</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mở ứng dụng ngân hàng bất kỳ để quét mã thanh toán
              </p>
            </div>

            {/* Khung Mã QR mô phỏng */}
            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-200 shadow-inner">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=CYBERFLIX_PAYOS_ORDER_2026"
                alt="VietQR PayOS"
                className="w-48 h-48 object-contain"
              />
              <span className="text-[11px] font-mono text-slate-800 font-bold mt-2">
                Nội dung CK: CYBERFLIX VIP
              </span>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs text-[#00A6FF] dark:text-[#00F0FF] font-mono font-bold animate-pulse">
                Đang chờ hệ thống PayOS ghi nhận...
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Đơn hàng tự động hết hạn sau 15 phút
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={() => setShowQrModal(false)}
            >
              Đóng Cửa Sổ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
