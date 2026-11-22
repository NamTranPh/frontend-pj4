import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AuthMode } from '../types/auth.types';
import { AuthModal } from '../components/AuthModal';

interface AuthModalContextType {
  isOpen: boolean;
  mode: AuthMode;
  openLogin: () => void;
  openRegister: () => void;
  openForgotPassword: () => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');

  const openLogin = useCallback(() => {
    setMode('login');
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setMode('register');
    setIsOpen(true);
  }, []);

  const openForgotPassword = useCallback(() => {
    setMode('forgot_email');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        mode,
        openLogin,
        openRegister,
        openForgotPassword,
        closeModal,
      }}
    >
      {children}
      {/* Global Auth Modal Mount Point */}
      <AuthModal
        isOpen={isOpen}
        initialMode={mode}
        onClose={closeModal}
      />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
