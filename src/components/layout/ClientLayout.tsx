import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const ClientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FB] dark:bg-[#070913] text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#00F0FF] selection:text-black transition-colors duration-300 relative overflow-x-hidden">
      {/* Ambient Cyberpunk Glows chìm tạo chiều sâu không gian điện ảnh */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#00F0FF]/3 dark:bg-[#00F0FF]/4 rounded-full blur-[140px] pointer-events-none -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="fixed top-1/3 -left-48 w-[600px] h-[600px] bg-[#9D00FF]/3 dark:bg-[#9D00FF]/4 rounded-full blur-[160px] pointer-events-none -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="fixed bottom-0 right-10 w-[550px] h-[550px] bg-[#E100FF]/2 dark:bg-[#E100FF]/3 rounded-full blur-[150px] pointer-events-none -z-10" 
      />

      <Header />

      <main className="flex-1 pt-18 sm:pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
