"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const Success = ({
  isOpen,
  onClose,
  message,
  onClick,
}: {
  isOpen: boolean;
  onClose: any;
  message: string;
  onClick?: () => void;
}) => {
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;
    if (isOpen) {
      html.style.overflowY = "hidden";
    }
  }, [isOpen]);

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[rgba(000,000,000,0.6)]">
      <div className="absolute left-1/2 top-1/2 z-50 w-full max-w-[389px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-primary bg-white px-[23px] py-[18px] text-center">
        <Image
          className="mx-auto"
          src={"/asset/image/modal/success.png"}
          width={43}
          height={43}
          alt="에러창"
        />

        <p className="mt-4 whitespace-nowrap text-base font-medium leading-[21px]">
          {message}
        </p>

        <button
          type="button"
          onClick={() => {
            if (onClick) {
              onClose();
              return onClick();
            }
            onClose();
          }}
          className="mt-[29px] h-[31px] w-[60px] flex-1 rounded bg-primary text-base font-semibold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Success;
