import { createContext } from 'react';

interface ModalState {
  Component: any;
  props: any;
  isOpen: boolean;
}

interface ModalDispatchContextState {
  openHandler: (Component: any, props: any) => void;
  closeHandler: (Component: any) => void;
}

export const ModalContext = createContext<ModalState[]>([]);
export const ModalDispatchContext =
  createContext<ModalDispatchContextState | null>(null);
