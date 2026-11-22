import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, ChevronLeft, ChevronRight, Info, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Movie } from '../../movies/types/movie.types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface HeroCinematicOpeningProps {
  movies: Movie[];
}

export const HeroCinematicOpening: React.FC<HeroCinematicOpeningProps> = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Drag / Swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMovie = movies[activeIndex] || movies[0];

  const handleNext = useCallback(() => {
    if (isAnimating || movies.length <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % movies.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, movies.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating || movies.length <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, movies.length]);

  // Phím mũi tên Bàn phím (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Lăn chuột ngang / dọc đổi phim (Wheel Event Debounced)
  const lastWheelTime = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 700) return;
    if (Math.abs(e.deltaY) > 30 || Math.abs(e.deltaX) > 30) {
      lastWheelTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Kéo chuột / Vuốt cảm ứng (Drag & Swipe)
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    touchEndX.current = e.clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  if (!activeMovie) return null;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[94vh] min-h-[580px] overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#070913]"
    >
      {/* 1. Backdrop Background với hiệu ứng chuyển tiếp mềm */}
      <div className="absolute inset-0 z-0">
        <img
          key={activeMovie.id}
          src={activeMovie.backdropUrl}
          alt={activeMovie.title}
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in-105 duration-1000 transition-transform ease-out"
        />

        {/* Lớp phủ Gradient Cyberpunk: Đậm dần về bên trái và dưới đáy */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070913] via-[#070913]/85 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#070913]/30 to-[#070913]" />

        {/* Lưới Synthwave Grid mờ dưới đáy màn hình theo Ảnh 1 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_right,#00F0FF15_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF15_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] pointer-events-none opacity-40" />
      </div>

      {/* 2. Nội dung chính: 2 Cột chuẩn phong cách Ảnh 2 */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-10 lg:py-16">
        {/* Hàng trên: Breadcrumb / Hãng sản xuất */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#00F0FF] font-bold">
              CINEMA SPOTLIGHT • {activeMovie.releaseYear}
            </span>
          </div>

          {/* Nút bật/tắt tiếng nếu có video teaser */}
          {activeMovie.videoUrl && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-full bg-black/40 hover:bg-[#00F0FF]/20 text-slate-300 hover:text-[#00F0FF] border border-white/10 hover:border-[#00F0FF]/40 backdrop-blur-md transition-all cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>

        {/* Khu vực giữa: Thông tin phim bên trái & Dãy Card Opening bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* CỘT TRÁI (7/12): Thông tin phim sinh động */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4 max-w-2xl">
            {/* Badges thông số */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="quality">{activeMovie.quality}</Badge>
              <Badge variant="type">{activeMovie.movieType === 'SINGLE' ? 'Phim Lẻ' : 'Phim Bộ'}</Badge>
              {activeMovie.isVip && <Badge variant="vip">VIP EXCLUSIVE</Badge>}
              <span className="text-xs text-[#FFEE00] font-bold flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-md border border-[#FFEE00]/30 backdrop-blur-xs">
                <Star size={13} className="fill-[#FFEE00]" /> {activeMovie.rating} / 10
              </span>
            </div>

            {/* Tiêu đề Phim Cực Lớn chuẩn Cyberpunk Typography */}
            <h1
              key={activeMovie.title}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] leading-none drop-shadow-[0_0_25px_rgba(0,240,255,0.4)] animate-in fade-in slide-in-from-bottom-6 duration-700"
            >
              {activeMovie.title}
            </h1>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-medium">
              {activeMovie.genres.map((g, idx) => (
                <span key={idx} className="hover:text-[#00F0FF] transition-colors">
                  #{g}
                </span>
              ))}
            </div>

            {/* Tóm tắt nội dung */}
            <p
              key={activeMovie.synopsis}
              className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100"
            >
              {activeMovie.synopsis}
            </p>

            {/* Cụm Nút CTA Cyberpunk */}
            <div className="flex items-center gap-4 pt-3">
              <Link to={`/watch/${activeMovie.slug}`}>
                <Button size="lg" variant="glow" leftIcon={<Play size={18} className="fill-current" />}>
                  XEM NGAY
                </Button>
              </Link>
              <Link to={`/movies/${activeMovie.slug}`}>
                <Button size="lg" variant="secondary" leftIcon={<Info size={18} />}>
                  Chi Tiết Phim
                </Button>
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI (5/12): DÃY THẺ ANIMATED CARDS OPENING (CHUẨN ẢNH 2) */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-72 sm:h-80 flex items-center gap-3.5 overflow-visible">
              {movies.map((movie, index) => {
                // Tính toán vị trí tương đối so với activeIndex
                const offset = (index - activeIndex + movies.length) % movies.length;
                const isCurrent = offset === 0;

                // Chỉ hiển thị tối đa 4 card kế tiếp trong hàng đợi deck
                if (offset > 3 && !isCurrent) return null;

                return (
                  <div
                    key={movie.id}
                    onClick={() => {
                      if (!isCurrent) {
                        setIsAnimating(true);
                        setActiveIndex(index);
                        setTimeout(() => setIsAnimating(false), 600);
                      }
                    }}
                    style={{
                      transform: isCurrent
                        ? 'scale(1.05) translateZ(0)'
                        : `translateX(${offset * 12}px) scale(${1 - offset * 0.08})`,
                      zIndex: 30 - offset,
                      opacity: isCurrent ? 1 : Math.max(0.4, 1 - offset * 0.25),
                    }}
                    className={`relative shrink-0 w-36 sm:w-44 h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border shadow-2xl group ${
                      isCurrent
                        ? 'border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.45)] ring-2 ring-[#00F0FF]/50'
                        : 'border-white/20 hover:border-[#00F0FF]/60 hover:scale-[0.98]'
                    }`}
                  >
                    {/* Ảnh Poster thẻ card */}
                    <img
                      src={movie.backdropUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient tối ở đáy card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/40 to-transparent" />

                    {/* Thông tin nhỏ trên thẻ card */}
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider block">
                        #{index + 1} SPOTLIGHT
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-[#00F0FF] transition-colors">
                        {movie.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-300">★ {movie.rating}</span>
                        <span className="text-slate-500 text-[10px]">•</span>
                        <span className="text-[10px] text-[#FFEE00] font-bold">{movie.quality}</span>
                      </div>
                    </div>

                    {/* Nút Play hover effect trên card */}
                    {!isCurrent && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#00F0FF] text-black flex items-center justify-center shadow-[0_0_15px_#00F0FF]">
                          <Play size={18} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hàng đáy: Thanh Chỉ Báo Tiến Trình & Phím Mũi Tên Điều Hướng (Chuẩn Ảnh 2) */}
        <div className="flex items-center justify-between pt-4 border-t border-[#162038]/60">
          {/* Thanh Indicator & Số thứ tự */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black font-mono text-[#00F0FF] drop-shadow-[0_0_10px_#00F0FF]">
              0{activeIndex + 1}
            </span>
            <div className="w-32 sm:w-48 h-1 bg-[#162038] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#00A6FF] to-[#00F0FF] transition-all duration-500 shadow-[0_0_10px_#00F0FF]"
                style={{ width: `${((activeIndex + 1) / movies.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-500">0{movies.length}</span>
          </div>

          {/* Cặp Nút Mũi Tên Tròn Điều Hướng */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              aria-label="Phim trước"
              className="w-11 h-11 rounded-full bg-[#0d1224]/80 hover:bg-[#00F0FF] text-slate-300 hover:text-[#070913] border border-[#162038] hover:border-[#00F0FF] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_18px_rgba(0,240,255,0.6)] cursor-pointer active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Phim kế tiếp"
              className="w-11 h-11 rounded-full bg-[#0d1224]/80 hover:bg-[#00F0FF] text-slate-300 hover:text-[#070913] border border-[#162038] hover:border-[#00F0FF] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_18px_rgba(0,240,255,0.6)] cursor-pointer active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
