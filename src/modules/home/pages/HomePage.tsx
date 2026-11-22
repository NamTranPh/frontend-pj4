import React, { useEffect, useState } from 'react';
import { HeroCinematicOpening } from '../components/HeroCinematicOpening';
import { MovieSlider } from '../components/MovieSlider';
import { movieService } from '../../movies/services/movieService';
import { Movie } from '../../movies/types/movie.types';
import { Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getFeaturedMovies();
        setMovies(data);
      } catch (err) {
        console.error('Failed to load movies for home:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 bg-[#F4F7FB] dark:bg-[#070913]">
        <div className="w-12 h-12 border-3 border-[#00A6FF] dark:border-[#00F0FF] border-t-transparent rounded-full animate-spin shadow-md dark:shadow-[0_0_15px_#00F0FF]" />
        <span className="text-xs uppercase font-mono tracking-widest text-[#00A6FF] dark:text-[#00F0FF] animate-pulse">
          Nạp luồng dữ liệu điện ảnh...
        </span>
      </div>
    );
  }

  const trendingMovies = movies.slice(0, 5);
  const actionMovies = movies.filter((m) => m.genres.includes('Hành Động') || m.genres.includes('Cyberpunk'));
  const animeMovies = movies.filter((m) => m.genres.includes('Anime'));

  return (
    <div className="space-y-8 bg-[#F4F7FB] dark:bg-[#070913] text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. Màn khởi đầu Hero Animated Cards Opening (Chuẩn Ảnh 2) */}
      <HeroCinematicOpening movies={movies} />

      {/* 2. Hàng Phim Thịnh Hành (Theo Ảnh 1 - Hero Slider Hàng Phim) */}
      <div className="max-w-7xl mx-auto">
        <MovieSlider
          title="HÃNG PHIM & NỘI DUNG NỔI BẬT"
          subtitle="Top các tác phẩm có lượt phát streaming cao nhất trong tuần"
          movies={trendingMovies}
          badgeColor="cyan"
        />

        {/* 3. Banner Quảng Bá Gói VIP VietQR PayOS Cyberpunk */}
        <div className="px-4 sm:px-6 lg:px-8 my-8">
          <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-linear-to-r from-purple-100/80 via-white to-blue-50/80 dark:from-[#140b2b] dark:via-[#0d1224] dark:to-[#071d2b] border border-purple-200 dark:border-[#9D00FF]/40 shadow-xl dark:shadow-[0_0_35px_rgba(157,0,255,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Background glowing effects */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#9D00FF]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 max-w-xl text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#FFEE00]/15 border border-amber-300 dark:border-[#FFEE00]/40 text-amber-600 dark:text-[#FFEE00] text-xs font-bold uppercase tracking-wider">
                <Crown size={14} /> Đặc Quyền Thành Viên VIP
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Trải nghiệm Phim 4K Không Giới Hạn Cùng VietQR PayOS
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Mở khóa toàn bộ kho phim chiếu rạp, âm thanh vòm Dolby Atmos, không quảng cáo và kích hoạt tự động chỉ trong 3 giây.
              </p>
            </div>

            <div className="z-10 shrink-0">
              <Link to="/vip">
                <Button size="lg" variant="glow" rightIcon={<ArrowRight size={18} />}>
                  NÂNG CẤP VIP NGAY
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Hàng Phim Hành Động & Viễn Tưởng */}
        <MovieSlider
          title="HÀNH ĐỘNG & CYBERPUNK CHẤT LƯỢNG CAO"
          subtitle="Những pha rượt đuổi mãn nhãn và kỹ xảo tương lai"
          movies={actionMovies.length > 0 ? actionMovies : movies}
          badgeColor="magenta"
        />

        {/* 5. Hàng Phim Anime Chiếu Rạp */}
        <MovieSlider
          title="ANIME CHIẾU RẠP & SIÊU PHẨM NHẬT BẢN"
          subtitle="Thế giới đồ họa đỉnh cao và cốt truyện xúc động"
          movies={animeMovies.length > 0 ? animeMovies : movies}
          badgeColor="yellow"
        />
      </div>
    </div>
  );
};
