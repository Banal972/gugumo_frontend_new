"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const Alert = ({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: any;
  message: string;
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
      <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-Error bg-white px-[43px] py-[18px] text-center">
        <Image
          className="mx-auto"
          src={"/asset/image/modal/error.png"}
          width={43}
          height={43}
          alt="에러창"
        />

        <p className="mt-4 whitespace-nowrap text-base font-medium leading-[21px]">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-[29px] h-[31px] w-[60px] rounded bg-Error text-base font-semibold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
