"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const Confirm = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;
    if (isOpen) {
      html.style.overflowY = "hidden";
    }
  }, [isOpen]);

  return (
    <div className="max-w-[239px] rounded-lg border border-primary px-[23px] py-[18px] text-center">
      <Image
        className="mx-auto"
        src={"/asset/image/modal/confirm.png"}
        width={43}
        height={43}
        alt="에러창"
      />

      <p className="mt-4 whitespace-nowrap text-base font-medium leading-[21px]">
        댓글을 삭제 하시겠습니까?
      </p>

      <div className="mt-[29px] flex justify-center gap-[7px]">
        <button
          type="button"
          onClick={onClose}
          className="h-[31px] flex-1 rounded border border-primary text-base font-semibold text-primary"
        >
          아니요
        </button>
        <button
          type="button"
          className="h-[31px] flex-1 rounded bg-primary text-base font-semibold text-white"
        >
          네, 할래요
        </button>
      </div>
    </div>
  );
};

export default Confirm;
