import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, ChevronLeft, ChevronRight, Info, Volume2, VolumeX, Pause } from 'lucide-react';
import { Movie } from '../../movies/types/movie.types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface HeroCinematicOpeningProps {
  movies: Movie[];
}

export const HeroCinematicOpening: React.FC<HeroCinematicOpeningProps> = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Video Ref & Swipe handling
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<number | null>(null);

  const total = movies.length;
  const activeMovie = movies[activeIndex] || movies[0];

  // Đồng bộ trạng thái mute trực tiếp với thẻ video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleNext = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setIsVideoReady(false);
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
    }, 750);
  }, [isAnimating, total, activeIndex]);

  const handlePrev = useCallback(() => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setIsVideoReady(false);
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
    }, 750);
  }, [isAnimating, total, activeIndex]);

  const handleSelectIndex = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setIsVideoReady(false);
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
    }, 750);
  };

  // 1. Tự động chuyển slide mượt mà (Auto-play sau 6 giây, tạm dừng khi hover)
  useEffect(() => {
    if (isPaused || total <= 1) return;

    autoPlayTimerRef.current = window.setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, total, handleNext]);

  // 2. Phím tắt bàn phím mũi tên Trái / Phải
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // 3. Xử lý lăn chuột (Wheel debounced)
  const lastWheelTime = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 650) return;
    if (Math.abs(e.deltaY) > 35 || Math.abs(e.deltaX) > 35) {
      lastWheelTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // 4. Kéo chuột / Vuốt cảm ứng
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

  if (!activeMovie || total === 0) return null;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative group/banner w-full h-[88vh] sm:h-[92vh] lg:h-[94vh] min-h-[600px] overflow-hidden select-none bg-[#070913]"
    >
      {/* 1. Backdrop Background  */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Lớp Nền Dưới: Ảnh của phim trước đó giữ nguyên*/}
        {prevIndex !== null && movies[prevIndex] && (
          <img
            src={movies[prevIndex].backdropUrl || movies[prevIndex].posterUrl}
            alt="Previous movie backdrop"
            className="absolute inset-0 w-full h-full object-cover object-center scale-102"
          />
        )}

        {/* Lớp Nền Trên (Overlay): Phim mới mở bung ra theo hiệu ứng Mở Màn Hình TV / Cinema Aperture */}
        <img
          key={activeMovie.id}
          src={activeMovie.backdropUrl || activeMovie.posterUrl}
          alt={activeMovie.title}
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            prevIndex !== null ? 'animate-tv-reveal' : 'scale-102'
          }`}
        />

        {/* Lớp Video Trailer Chạy Nền Sau Khi Tải Xong */}
        {activeMovie.videoUrl && (
          <video
            key={`trailer-${activeMovie.id}-${activeMovie.videoUrl}`}
            ref={videoRef}
            src={activeMovie.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onCanPlay={() => setIsVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Lớp phủ */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/65 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070913] via-[#070913]/85 to-transparent lg:w-3/4 z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#070913]/30 to-[#070913] z-1" />

        {/* Ambient Glow ánh sáng phản chiếu neon */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none z-1" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9D00FF]/10 rounded-full blur-[140px] pointer-events-none z-1" />

        {/* Lưới Synthwave Grid mờ dưới đáy màn hình */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-[linear-gradient(to_right,#00F0FF12_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF12_1px,transparent_1px)] bg-[size:44px_44px] [transform:perspective(500px)_rotateX(60deg)] pointer-events-none opacity-40 z-1" />
      </div>

      {/* 2. Nội dung Banner */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8 lg:py-12">
        {/* Hàng trên: Spotlight Label & Nút Âm Thanh */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#00F0FF]/30">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#00F0FF] font-black">
              CINEMA SPOTLIGHT • {activeMovie.releaseYear}
            </span>
          </div>

          {activeMovie.videoUrl && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-full bg-black/50 hover:bg-[#00F0FF]/20 text-slate-300 hover:text-[#00F0FF] border border-white/10 hover:border-[#00F0FF]/40 backdrop-blur-md transition-all cursor-pointer shadow-md"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>

        {/* --- 1. DESKTOP VIEW (>= 1024px): Bố cục 2 Cột với Dãy Thẻ 3D Deck Sang Trọng --- */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* CỘT TRÁI (7/12): Thông tin phim sinh động */}
          <div className="col-span-6 xl:col-span-7 space-y-4 max-w-2xl">
            {/* Badges thông số */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="quality" className="backdrop-blur-xs font-black">
                {activeMovie.quality === 'FOUR_K' ? '4K Ultra HD' : activeMovie.quality}
              </Badge>
              <Badge variant="type">
                {activeMovie.movieType === 'SINGLE' ? 'Phim Lẻ' : 'Phim Bộ'}
              </Badge>
              {activeMovie.isVip && (
                <Badge variant="vip" className="font-black">
                  VIP EXCLUSIVE
                </Badge>
              )}
              <span className="text-xs text-[#FFEE00] font-black flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-md border border-[#FFEE00]/30 backdrop-blur-xs shadow-xs">
                <Star size={13} className="fill-[#FFEE00]" /> {activeMovie.rating} / 10
              </span>
            </div>

            {/* Tiêu đề Phim Cực Lớn chuẩn Cyberpunk Typography */}
            <h1
              key={activeMovie.title}
              className="text-4xl xl:text-6xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] leading-tight drop-shadow-[0_0_25px_rgba(0,240,255,0.35)] animate-in fade-in slide-in-from-bottom-5 duration-700"
            >
              {activeMovie.title}
            </h1>

            {/* Thể loại */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-semibold">
              {activeMovie.genres.map((g, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-colors"
                >
                  #{g}
                </span>
              ))}
            </div>

            {/* Tóm tắt nội dung */}
            <p
              key={activeMovie.synopsis}
              className="text-sm md:text-base text-slate-300 line-clamp-3 leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100"
            >
              {activeMovie.synopsis}
            </p>

            {/* Cụm Nút CTA Xem Ngay & Chi Tiết */}
            <div className="flex items-center gap-4 pt-2">
              <Link to={`/watch/${activeMovie.slug}`}>
                <Button
                  size="lg"
                  variant="glow"
                  leftIcon={<Play size={18} className="fill-current" />}
                  className="shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
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

          {/* CỘT PHẢI (5/12): DÃY THẺ SPOTLIGHT 3D DECK (Chỉ giữ trên Desktop) */}
          <div className="col-span-6 xl:col-span-5 flex items-center justify-end">
            <div className="relative w-full max-w-[420px] h-76 select-none">
              {movies.map((movie, index) => {
                let diff = (index - activeIndex + total) % total;
                const isCurrent = diff === 0;
                const isNext = diff === 1;
                const isFarNext = diff === 2;
                const isPrev = diff === total - 1;

                let translateX = 0;
                let scale = 1;
                let opacity = 0;
                let zIndex = 0;
                let pointerEvents: 'auto' | 'none' = 'none';

                if (isCurrent) {
                  translateX = 0;
                  scale = 1.04;
                  opacity = 1;
                  zIndex = 30;
                  pointerEvents = 'auto';
                } else if (isNext) {
                  translateX = 125;
                  scale = 0.9;
                  opacity = 0.75;
                  zIndex = 20;
                  pointerEvents = 'auto';
                } else if (isFarNext) {
                  translateX = 240;
                  scale = 0.78;
                  opacity = 0.45;
                  zIndex = 10;
                  pointerEvents = 'auto';
                } else if (isPrev) {
                  translateX = -75;
                  scale = 0.85;
                  opacity = 0;
                  zIndex = 5;
                } else {
                  translateX = 340;
                  scale = 0.7;
                  opacity = 0;
                  zIndex = 0;
                }

                return (
                  <div
                    key={movie.id}
                    onClick={() => handleSelectIndex(index)}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex,
                      opacity,
                      pointerEvents,
                      transition: 'all 550ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className={`absolute top-0 left-0 w-44 h-68 rounded-2xl overflow-hidden cursor-pointer border shadow-2xl group ${
                      isCurrent
                        ? 'border-[#00F0FF] shadow-[0_0_28px_rgba(0,240,255,0.5)] ring-2 ring-[#00F0FF]/50'
                        : 'border-white/20 hover:border-[#00F0FF]/60 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={movie.posterUrl || movie.backdropUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/35 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider block font-bold">
                        #{index + 1} SPOTLIGHT
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#00F0FF] transition-colors">
                        {movie.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-300">★ {movie.rating}</span>
                        <span className="text-slate-400 text-[10px]">•</span>
                        <span className="text-[10px] text-[#FFEE00] font-bold">
                          {movie.quality === 'FOUR_K' ? '4K' : movie.quality}
                        </span>
                      </div>
                    </div>
                    {!isCurrent && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#00F0FF] text-black flex items-center justify-center shadow-[0_0_15px_#00F0FF]">
                          <Play size={16} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- 2. TABLET & MOBILE VIEW (< 1024px): Immersive Cinema Cover & Bottom Thumb-Dock --- */}
        <div className="lg:hidden flex flex-col justify-end mt-auto space-y-4 pb-2">
          {/* Thông tin phim neo ở 1/3 phía chân màn hình (Thumb reach zone) */}
          <div className="space-y-2.5 max-w-xl">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Badge variant="quality" className="backdrop-blur-xs font-black text-[10px] sm:text-xs">
                {activeMovie.quality === 'FOUR_K' ? '4K Ultra HD' : activeMovie.quality}
              </Badge>
              <Badge variant="type" className="text-[10px] sm:text-xs">
                {activeMovie.movieType === 'SINGLE' ? 'Phim Lẻ' : 'Phim Bộ'}
              </Badge>
              {activeMovie.isVip && (
                <Badge variant="vip" className="font-black text-[10px] sm:text-xs">
                  VIP
                </Badge>
              )}
              <span className="text-[11px] sm:text-xs text-[#FFEE00] font-black flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-[#FFEE00]/30 backdrop-blur-xs">
                <Star size={12} className="fill-[#FFEE00]" /> {activeMovie.rating}
              </span>
            </div>

            <h1
              key={activeMovie.title}
              className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-[#00F0FF] leading-tight drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] animate-in fade-in slide-in-from-bottom-3 duration-500"
            >
              {activeMovie.title}
            </h1>

            <p
              key={activeMovie.synopsis}
              className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed drop-shadow-md"
            >
              {activeMovie.synopsis}
            </p>

            {/* Cụm Nút CTA Xem Ngay & Chi Tiết (Diện tích chạm >= 44px) */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
              <Link to={`/watch/${activeMovie.slug}`} className="flex-1 sm:flex-initial">
                <Button
                  size="md"
                  variant="glow"
                  leftIcon={<Play size={16} className="fill-current" />}
                  className="w-full sm:w-auto min-h-[44px] px-5 sm:px-6 shadow-[0_0_20px_rgba(0,240,255,0.4)] text-xs sm:text-sm"
                >
                  XEM NGAY
                </Button>
              </Link>
              <Link to={`/movies/${activeMovie.slug}`} className="flex-1 sm:flex-initial">
                <Button
                  size="md"
                  variant="secondary"
                  leftIcon={<Info size={16} />}
                  className="w-full sm:w-auto min-h-[44px] px-4 sm:px-5 text-xs sm:text-sm"
                >
                  Chi Tiết
                </Button>
              </Link>
            </div>
          </div>

          {/* Dãy Floating Thumbnail Dock Vuốt Chạm Đáy */}
          <div className="pt-1.5 space-y-2">
            {/* Vạch Story Progress Phân Đoạn */}
            <div className="flex items-center gap-1.5 pb-1">
              {movies.map((_, idx) => {
                const isCur = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectIndex(idx)}
                    aria-label={`Chọn phim ${idx + 1}`}
                    className="flex-1 h-1 rounded-full bg-slate-700/50 hover:bg-slate-600 overflow-hidden cursor-pointer transition-colors"
                  >
                    {isCur ? (
                      <div className="h-full bg-linear-to-r from-[#00A6FF] to-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Mini Carousel Dock Chạm & Vuốt Ngang */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
              {movies.map((m, idx) => {
                const isCur = idx === activeIndex;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectIndex(idx)}
                    className={`shrink-0 snap-start rounded-xl overflow-hidden transition-all duration-300 relative text-left cursor-pointer active:scale-95 ${
                      isCur
                        ? 'w-20 sm:w-24 h-28 sm:h-34 border-2 border-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.6)] -translate-y-1'
                        : 'w-16 sm:w-20 h-24 sm:h-28 border border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={m.posterUrl || m.backdropUrl}
                      alt={m.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] sm:text-[10px] font-bold text-white truncate block">
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cặp Nút Mũi Tên Trái / Phải (Chỉ hiện trên Desktop lg khi hover) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Phim trước"
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-[#00F0FF] text-white hover:text-[#070913] border border-white/20 hover:border-[#00F0FF] shadow-lg hover:shadow-[0_0_20px_#00F0FF] backdrop-blur-md items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 -translate-x-4 group-hover/banner:opacity-100 group-hover/banner:translate-x-0 pointer-events-auto"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Phim kế tiếp"
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-[#00F0FF] text-white hover:text-[#070913] border border-white/20 hover:border-[#00F0FF] shadow-lg hover:shadow-[0_0_20px_#00F0FF] backdrop-blur-md items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 translate-x-4 group-hover/banner:opacity-100 group-hover/banner:translate-x-0 pointer-events-auto"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dãy điểm chỉ báo căn CHÍNH GIỮA theo chiều ngang (Chỉ hiện trên Desktop) */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg">
        {movies.map((_, idx) => {
          const isCur = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => handleSelectIndex(idx)}
              aria-label={`Chuyển đến phim ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isCur
                  ? 'w-8 bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]'
                  : 'w-2.5 bg-slate-600/70 hover:bg-slate-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
