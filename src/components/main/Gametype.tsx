'use client';

import { GAMETYPE } from '@/constant/card/constant';
import Image from 'next/image';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

interface GametypeProps {
  gametype: string;
  setQuery: Dispatch<
    SetStateAction<{
      q: string;
      meetingstatus: string;
      location: string;
      gametype: string;
      sort: string;
      page: number;
    }>
  >;
}

const Gametype = ({ gametype, setQuery }: GametypeProps) => {
  const onClickHandler = (type: string) => {
    setQuery((prev) => ({ ...prev, gametype: type }));
  };

  return (
    <>
      <p className="text-base font-semibold text-OnSurface md:text-lg">종목</p>
      <div className="mt-[11px] flex gap-[4px] overflow-x-auto pb-1 md:flex-wrap md:gap-[14px]">
        <Button
          gametype={gametype}
          onClick={() => onClickHandler('')}
          get=""
          label="전체"
        />
        {Object.entries(GAMETYPE).map((game) => {
          let option = {
            src: '',
            width: 0,
            height: 0,
          };
          switch (game[0]) {
            case 'BADMINTON':
              option = {
                src: '/asset/image/balltype/ball01.png',
                width: 35,
                height: 35,
              };
              break;
            case 'FUTSAL':
              option = {
                src: '/asset/image/balltype/ball03.png',
                width: 31,
                height: 31,
              };
              break;
            case 'BASKETBALL':
              option = {
                src: '/asset/image/balltype/ball02.png',
                width: 31,
                height: 32,
              };
              break;
            case 'TENNIS':
              option = {
                src: '/asset/image/balltype/ball04.png',
                width: 31,
                height: 30,
              };
              break;
            case 'TABLETENNIS':
              option = {
                src: '/asset/image/balltype/ball05.png',
                width: 34,
                height: 34,
              };
              break;
            case 'BASEBALL':
              option = {
                src: '/asset/image/balltype/ball06.png',
                width: 30,
                height: 30,
              };
              break;
            default:
              break;
          }
          return (
            <Button
              key={game[0]}
              option={option}
              gametype={gametype}
              onClick={() => onClickHandler(game[0])}
              get={game[0]}
              label={game[1]}
            />
          );
        })}
      </div>
    </>
  );
};

export default Gametype;

interface ButtonProps {
  onClick: MouseEventHandler;
  gametype: string;
  get: string;
  label: string;
  option?: {
    src: string;
    width: number;
    height: number;
  };
}

const Button = ({ onClick, option, gametype, get, label }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      key={get}
      className={`relative box-border size-[77px] flex-none cursor-pointer overflow-hidden rounded-full border border-primary transition-colors hover:bg-primary hover:text-white ${gametype === get ? 'bg-primary text-white' : 'bg-background text-primary'}`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex ${get === '' ? '' : 'flex-col gap-[2px]'} items-center justify-center text-sm font-medium`}
      >
        {option && (
          <Image
            src={
              gametype === get && gametype === 'BADMINTON'
                ? '/asset/image/balltype/ball01_active.png'
                : option.src
            }
            width={0}
            height={0}
            sizes="100vw"
            alt={label}
            style={{ width: option?.width, height: option?.height }}
          />
        )}
        {label}
      </div>
    </button>
  );
};
