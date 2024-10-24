"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ListSearch = () => {
  const [q, setQ] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmitHandler = (event: any) => {
    const { search } = event;
    setQ(search);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="relative -order-1 block h-[34px] w-full rounded-lg bg-Surface md:order-1 md:h-[53px] md:w-[492px]"
    >
      <input
        type="text"
        className="box-border h-full w-full bg-transparent px-3 text-[13px] font-medium outline-none md:text-base"
        placeholder="제목, 글 내용을 검색해보세요!"
        {...register("search")}
      />
      <button
        type="submit"
        className="absolute right-[10px] top-1/2 w-5 -translate-y-1/2 md:w-auto"
      >
        <Image
          src="/asset/image/icon/search.svg"
          alt="검색버튼"
          width={24}
          height={24}
        />
      </button>
    </form>
  );
};

export default ListSearch;
