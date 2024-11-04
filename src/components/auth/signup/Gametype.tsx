import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface GametypeProps {
  likeGame: string[];
  setLikeGame: Dispatch<SetStateAction<string[]>>;
}

const GAMETYPE = [
  { get: 'BADMINTON', name: '배드민턴' },
  { get: 'FUTSAL', name: '풋살' },
  { get: 'BASKETBALL', name: '농구' },
  { get: 'TENNIS', name: '테니스' },
  { get: 'TABLETENNIS', name: '탁구' },
  { get: 'BASEBALL', name: '야구' },
];

const Gametype = ({ likeGame, setLikeGame }: GametypeProps) => {
  const gameTypeClickHanlder = (type: string) => {
    if (likeGame.includes(type)) {
      setLikeGame(likeGame.filter((el) => el !== type));
    } else {
      setLikeGame((prev) => [...prev, type]);
    }
  };

  return (
    <>
      {GAMETYPE.map((el) => {
        let option = {
          src: '',
          width: 0,
          height: 0,
        };
        switch (el.get) {
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
          <button
            onClick={() => gameTypeClickHanlder(el.get)}
            type="button"
            key={el.get}
            className={`relative box-border size-[77px] flex-none cursor-pointer overflow-hidden rounded-full border border-primary ${likeGame.includes(el.get) ? 'bg-primary text-white' : 'bg-background text-primary'}`}
          >
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-[2px] text-sm font-medium">
              <Image
                src={
                  likeGame.includes(el.get) && el.get === 'BADMINTON'
                    ? '/asset/image/balltype/ball01_active.png'
                    : option.src
                }
                width={0}
                height={0}
                sizes="100vw"
                alt={el.name}
                className="h-auto w-full"
              />
              {el.name}
            </div>
          </button>
        );
      })}
    </>
  );
};

export default Gametype;
