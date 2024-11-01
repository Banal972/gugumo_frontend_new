'use client';

import {
  ModalContext,
  ModalDispatchContext,
} from '@/provider/ModalProvider/ModalContext';
import CustomModal from '@/ui/layout/CustomModal';
import { ReactNode, useCallback, useMemo, useState } from 'react';

interface ModalState {
  Component: any;
  props: any;
  isOpen: boolean;
}

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [opendModals, setOpendModals] = useState<ModalState[]>([]);

  const openHandler = useCallback((Component: any, props: any) => {
    setOpendModals((prev) => [
      ...prev,
      {
        Component,
        props,
        isOpen: true,
      },
    ]);
  }, []);

  const closeHandler = useCallback((Component: any) => {
    setOpendModals((prev) => {
      return prev.filter((modal) => modal.Component !== Component);
    });
  }, []);

  const value = useMemo(() => {
    return { openHandler, closeHandler };
  }, [openHandler, closeHandler]);

  return (
    <ModalContext.Provider value={opendModals}>
      <ModalDispatchContext.Provider value={value}>
        <CustomModal />
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
