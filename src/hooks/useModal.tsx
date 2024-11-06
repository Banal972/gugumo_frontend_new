/* 
  @Todo
  추후 modal을 한번에 관리하기 위해서 사용
*/
import {
  ModalContext,
  ModalDispatchContext,
} from '@/provider/ModalProvider/ModalContext';
import { useContext } from 'react';

interface ModalDispatchContextState {
  openHandler: (Component: any, props: any) => void;
  closeHandler: (Component: any) => void;
}

const useModal = () => {
  const openedModals = useContext(ModalContext);
  const { openHandler, closeHandler } = useContext(
    ModalDispatchContext,
  ) as ModalDispatchContextState;
  return { openedModals, openHandler, closeHandler };
};

export default useModal;
