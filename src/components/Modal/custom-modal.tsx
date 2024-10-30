'use client';

import { close } from '@/lib/store/features/modals/modal';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function CustomModal() {
  const params = useParams();
  const modals = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;
    html.style.overflowY = 'auto';
    dispatch(close());
  }, [params, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      {modals.map((info, index) => {
        const { Component, isOpen, props } = info;
        const onClose = () => {
          const html = document.querySelector('html');
          if (!html) return;
          html.style.overflowY = 'auto';
          dispatch(close(Component));
        };
        return (
          <Component key={index} isOpen={isOpen} onClose={onClose} {...props} />
        );
      })}
    </>,
    document.body,
  );
}
