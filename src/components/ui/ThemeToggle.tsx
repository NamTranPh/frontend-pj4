/**
 * From Uiverse.io by RiccardoRapelli - https://uiverse.io/RiccardoRapelli/jolly-chicken-91
 * MIT License, Copyright (c) RiccardoRapelli (Riccardo Rapelli)
 */
import React, { useEffect, useState, useId } from 'react';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const inputId = useId();
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

  const handleToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <label
      htmlFor={inputId}
      className={`${styles.switch} ${className}`}
      title={isDark ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        aria-label="Chuyển đổi giao diện Sáng / Tối"
        aria-checked={isDark}
        checked={isDark}
        onChange={handleToggle}
        className={styles.input}
      />
      <div className={styles.slider}>
        <div className={styles.sunMoon}>
          <svg className={`${styles.moonDot} ${styles.moonDot1}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.moonDot} ${styles.moonDot2}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.moonDot} ${styles.moonDot3}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>

          <svg className={`${styles.lightRay} ${styles.lightRay1}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.lightRay} ${styles.lightRay2}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.lightRay} ${styles.lightRay3}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>

          <svg className={`${styles.cloudDark} ${styles.cloud1}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.cloudDark} ${styles.cloud2}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.cloudDark} ${styles.cloud3}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.cloudLight} ${styles.cloud4}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.cloudLight} ${styles.cloud5}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg className={`${styles.cloudLight} ${styles.cloud6}`} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className={styles.stars}>
          <svg className={`${styles.star} ${styles.star1}`} viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className={`${styles.star} ${styles.star2}`} viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className={`${styles.star} ${styles.star3}`} viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
          <svg className={`${styles.star} ${styles.star4}`} viewBox="0 0 20 20">
            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
          </svg>
        </div>
      </div>
    </label>
  );
};
