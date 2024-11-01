'use client';

import useModal from '@/hooks/useModal';

const CustomModal = () => {
  const { openedModals, closeHandler } = useModal();

  return (
    <>
      {openedModals.map((modalInfo) => {
        const { Component, props, isOpen } = modalInfo;
        const onCloseHandler = () => {
          closeHandler(Component);
        };

        return (
          <div
            key={Component}
            className="fixed left-0 top-0 z-40 h-full w-full"
          >
            <div className="absolute left-0 top-0 h-full w-full bg-black/50" />
            <Component isOpen={isOpen} onClose={onCloseHandler} {...props} />
          </div>
        );
      })}
    </>
  );
};

export default CustomModal;
