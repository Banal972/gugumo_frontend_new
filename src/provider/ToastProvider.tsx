'use client';

import ToastMessage from '@/ui/ToastMessage';
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';

interface ToastContextState {
  currentType: 'success' | 'error';
  message: string;
  isVisible: boolean;
  showToast: (
    type: 'success' | 'error',
    msg: string,
    duration?: number,
  ) => void;
}

// ToastContext 생성
const ToastContext = createContext<ToastContextState | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [currentType, setCurrentType] = useState<'success' | 'error'>('error');
  const [message, setMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showToast = useCallback(
    (type: 'success' | 'error', msg: string, duration = 3000) => {
      setCurrentType(type);
      setMessage(msg);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setMessage('');
      }, duration);
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      currentType,
      message,
      isVisible,
      showToast,
    }),
    [currentType, message, isVisible, showToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastMessage
        message={message}
        isVisible={isVisible}
        type={currentType}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('ToastProvider을 연결해야합니다.');
  }
  return context;
};
