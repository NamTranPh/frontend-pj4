import React from 'react';

interface MovieFilterBarProps {
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
}

const GENRES = ['Tất Cả', 'Hành Động', 'Cyberpunk', 'Anime', 'Viễn Tưởng', 'Kỳ Ảo', 'Lãng Mạn', 'Bắn Súng'];

export const MovieFilterBar: React.FC<MovieFilterBarProps> = ({
  selectedGenre,
  onSelectGenre,
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="space-y-4 pb-4">
      {/* Tab Loại Phim (Tất Cả, Phim Lẻ, Phim Bộ) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#162038] pb-3">
        {[
          { label: 'Tất Cả Định Dạng', value: '' },
          { label: 'Phim Lẻ (Single)', value: 'SINGLE' },
          { label: 'Phim Bộ (Series)', value: 'SERIES' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => onSelectType(tab.value)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedType === tab.value
                ? 'bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tag Pills Thể Loại chuẩn Cyberpunk (Theo Ảnh 1) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50 dark:bg-[#00F0FF]/15 text-[#00A6FF] dark:text-[#00F0FF] border border-[#00A6FF] dark:border-[#00F0FF] shadow-xs dark:shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-white dark:bg-[#0d1224] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-slate-900 dark:hover:text-white shadow-xs'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
};
