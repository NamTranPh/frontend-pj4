import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieFilterBar } from '../components/MovieFilterBar';
import { MovieCard } from '../components/MovieCard';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie.types';
import { Film } from 'lucide-react';

export const MovieListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedGenre, setSelectedGenre] = useState<string>('Tất Cả');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedType(searchParams.get('type') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await movieService.getMovies({
          type: selectedType || undefined,
          genre: selectedGenre !== 'Tất Cả' ? selectedGenre : undefined,
          search: initialSearch || undefined,
        });
        setMovies(res.movies);
      } catch (err) {
        console.error('Error fetching movie list:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [selectedType, selectedGenre, initialSearch]);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    if (type) {
      searchParams.set('type', type);
    } else {
      searchParams.delete('type');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Tiêu đề trang */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#162038] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Danh Sách Phim</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A6FF] dark:bg-[#00F0FF] shadow-sm dark:shadow-[0_0_10px_#00F0FF]" />
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Khám phá kho tàng phim chiếu rạp và series đình đám chuẩn 4K HDR
          </p>
        </div>

        {initialSearch && (
          <div className="text-xs text-[#00A6FF] dark:text-[#00F0FF] bg-blue-50 dark:bg-[#00F0FF]/10 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-[#00F0FF]/30">
            Kết quả tìm kiếm cho: &ldquo;<span className="font-bold">{initialSearch}</span>&rdquo;
          </div>
        )}
      </div>

      {/* Bộ lọc HUD */}
      <MovieFilterBar
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        selectedType={selectedType}
        onSelectType={handleSelectType}
      />

      {/* Lưới Phim (Movie Grid) */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00A6FF] dark:border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Đang đồng bộ danh mục...</span>
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center gap-3 text-center bg-white dark:bg-[#0d1224] rounded-2xl border border-slate-200 dark:border-[#162038] shadow-sm">
          <Film size={36} className="text-slate-400 dark:text-slate-500" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Không tìm thấy bộ phim phù hợp</p>
          <span className="text-xs text-slate-500">Hãy thử đổi thể loại hoặc từ khóa tìm kiếm</span>
        </div>
      )}
    </div>
  );
};
