import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthModalProvider } from '../modules/auth/context/AuthModalContext';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <AppRoutes />
      </AuthModalProvider>
    </BrowserRouter>
  );
};
