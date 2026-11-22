import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ClientLayout } from '../components/layout/ClientLayout';
import { HomePage } from '../modules/home/pages/HomePage';
import { MovieListPage } from '../modules/movies/pages/MovieListPage';
import { MovieDetailPage } from '../modules/movies/pages/MovieDetailPage';
import { WatchPage } from '../modules/watch/pages/WatchPage';
import { VipPricingPage } from '../modules/membership/pages/VipPricingPage';
import { useAuthModal } from '../modules/auth/context/AuthModalContext';

const AuthRedirectHandler: React.FC = () => {
  const { openLogin } = useAuthModal();
  const navigate = useNavigate();

  useEffect(() => {
    openLogin();
    navigate('/', { replace: true });
  }, [openLogin, navigate]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MovieListPage />} />
        <Route path="movies/:slug" element={<MovieDetailPage />} />
        <Route path="watch/:slug" element={<WatchPage />} />
        <Route path="vip" element={<VipPricingPage />} />
        <Route path="auth/login" element={<AuthRedirectHandler />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
