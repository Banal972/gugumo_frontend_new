'use client';

import Portal from '@/ui/Portal';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAlertOutline } from 'react-icons/io5';

interface ToastMessageProps {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
}

const ToastMessage = ({ type, message, isVisible }: ToastMessageProps) => {
  return (
    <Portal>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`fixed right-4 top-4 z-50 flex min-w-60 gap-2 rounded-xl border bg-white p-3 shadow-lg ${type === 'error' ? 'border-red-500/50' : 'border-primary/50'} `}
            key="modal"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <div
              className={`flex size-6 items-center justify-center rounded-full text-base text-white ${type === 'error' ? 'bg-red-500' : 'bg-primary'}`}
            >
              <IoAlertOutline />
            </div>
            <div>
              <p
                className={`text-base font-semibold ${type === 'error' ? 'text-red-500' : 'text-primary'}`}
              >
                {type === 'error' && '에러'}
                {type === 'success' && '성공'}
              </p>
              <p className="text-sm font-light">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ToastMessage;
