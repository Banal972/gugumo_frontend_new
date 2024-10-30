import {
  ModalContext,
  ModalDispatchContext,
  ModalDispatchContextState,
} from '@/provider/ModalProvider';
import { useContext } from 'react';

const useModal = () => {
  const openedModals = useContext(ModalContext);
  const { openHandler, closeHandler } = useContext(
    ModalDispatchContext,
  ) as ModalDispatchContextState;
  return { openedModals, openHandler, closeHandler };
};

export default useModal;
