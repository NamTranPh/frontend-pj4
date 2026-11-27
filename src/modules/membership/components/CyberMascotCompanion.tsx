import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export const CyberMascotCompanion: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);

  // Hiệu ứng micro-interaction: Xuất hiện bong bóng thoại mượt mà sau 1 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. DESKTOP & TABLET WIDE VIEW (>= 768px): Floating Holographic Companion ở góc phải phía dưới */}
      <div
        className="hidden md:flex fixed bottom-2 right-4 lg:bottom-4 lg:right-8 z-30 flex-col items-end pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Bong bóng thoại Holographic Cyber */}
        <div
          className={`relative max-w-xs mb-2 mr-6 transition-all duration-700 ease-out pointer-events-auto ${
            showBubble
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95 pointer-events-none"
          }`}
        >
          <div className="relative px-4 py-2.5 rounded-2xl bg-[#070913]/90 dark:bg-[#070913]/90 backdrop-blur-md border border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.35),0_0_10px_rgba(225,0,255,0.2)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-ping" />
              <p className="text-xs lg:text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] tracking-wide whitespace-nowrap drop-shadow-xs">
                Kích hoạt VIP ngay, Xem phim cực bay! 🚀
              </p>
            </div>

            {/* Mũi nhọn bong bóng chỉ xuống chú mèo (Speech Bubble Tail) */}
            <div className="absolute -bottom-1.5 right-10 w-3 h-3 bg-[#070913] border-r border-b border-[#00F0FF]/60 rotate-45" />
          </div>
        </div>

        {/* Khung Linh Vật Mèo Cyberpunk Bay Lơ Lửng (Floating Effect) */}
        <div className="relative group pointer-events-auto">
          {/* Ảnh linh vật từ /cyber-mascot.png */}
          <div className="animate-float-slow transition-transform duration-500 group-hover:scale-105">
            <img
              src="/cyber-mascot.png"
              alt="Cyber VIP Mascot"
              className="w-48 sm:w-56 lg:w-64 max-h-48 lg:max-h-56 object-contain drop-shadow-[0_10px_25px_rgba(0,240,255,0.35)]"
            />
          </div>

          {/* Vầng sáng Hologram phản chiếu nhẹ phía dưới chân linh vật */}
          <div className="w-28 sm:w-36 h-6 mx-auto bg-linear-to-r from-[#00F0FF]/30 via-[#E100FF]/25 to-[#FFEE00]/20 rounded-full blur-md -mt-3 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
        </div>
      </div>

      {/* 2. MOBILE VIEW (< 768px): Thu nhỏ xuống dưới cùng của trang để tránh chật chội */}
      <div className="md:hidden mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/80 dark:bg-[#0d1224]/80 backdrop-blur-md border shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src="/cyber-mascot.png"
              alt="Cyber VIP Mascot"
              className="w-14 h-14 object-contain animate-float-slow"
            />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#00F0FF]/30 rounded-full blur-xs" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-[#00A6FF] dark:text-[#00F0FF]">
              <Sparkles size={11} /> Trợ lý Điện ảnh
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Kích hoạt VIP ngay, Xem phim cực bay! 🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
