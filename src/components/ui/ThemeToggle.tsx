import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('cyber_theme') as 'dark' | 'light';
      if (savedTheme) return savedTheme;
    }
    return 'dark'; // Mặc định Dark Mode
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('cyber_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-[#0d1224] text-slate-700 dark:text-[#00F0FF] border border-slate-300 dark:border-[#162038] hover:border-[#00F0FF] hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all cursor-pointer select-none active:scale-90"
      title={theme === 'dark' ? 'Chuyển sang Giao diện Sáng (Cyber-Clean)' : 'Chuyển sang Giao diện Tối (Neo-Cyber)'}
      aria-label="Chuyển đổi giao diện Sáng / Tối"
    >
      {theme === 'dark' ? (
        <Sun size={17} className="text-[#FFEE00] animate-in spin-in-180 duration-500" />
      ) : (
        <Moon size={17} className="text-[#00A6FF] animate-in spin-in-180 duration-500" />
      )}
    </button>
  );
};
