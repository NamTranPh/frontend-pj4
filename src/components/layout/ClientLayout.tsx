import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const ClientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FB] dark:bg-[#070913] text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#00F0FF] selection:text-black transition-colors duration-300">
      <Header />
      <main className="flex-1 pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
