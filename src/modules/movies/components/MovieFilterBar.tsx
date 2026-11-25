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
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#162038] pb-3 overflow-x-auto scrollbar-none">
        {[
          { label: 'Tất Cả Định Dạng', shortLabel: 'Tất Cả', value: '' },
          { label: 'Phim Lẻ (Single)', shortLabel: 'Phim Lẻ', value: 'SINGLE' },
          { label: 'Phim Bộ (Series)', shortLabel: 'Phim Bộ', value: 'SERIES' },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onSelectType(tab.value)}
            className={`shrink-0 min-h-[38px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
              selectedType === tab.value
                ? 'bg-[#00A6FF] dark:bg-[#00F0FF] text-white dark:text-[#070913] shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Tag Pills Thể Loại chuẩn Cyberpunk */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className={`shrink-0 min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center ${
                isActive
                  ? 'bg-blue-50 dark:bg-[#00F0FF]/15 text-[#00A6FF] dark:text-[#00F0FF] border border-[#00A6FF] dark:border-[#00F0FF] shadow-xs dark:shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-white dark:bg-[#0d1224] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#162038] hover:border-[#00A6FF] dark:hover:border-[#00F0FF]/50 hover:text-slate-900 dark:hover:text-white shadow-xs'
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
