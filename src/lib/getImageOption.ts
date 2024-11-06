const getImageOption = (gameType: string) => {
  switch (gameType) {
    case 'BADMINTON':
      return { src: '/asset/image/balltype/ball01.png', width: 35, height: 35 };
    case 'FUTSAL':
      return { src: '/asset/image/balltype/ball03.png', width: 31, height: 31 };
    case 'BASKETBALL':
      return { src: '/asset/image/balltype/ball02.png', width: 31, height: 32 };
    case 'TENNIS':
      return { src: '/asset/image/balltype/ball04.png', width: 31, height: 30 };
    case 'TABLETENNIS':
      return { src: '/asset/image/balltype/ball05.png', width: 34, height: 34 };
    case 'BASEBALL':
      return { src: '/asset/image/balltype/ball06.png', width: 30, height: 30 };
    default:
      return { src: '', width: 0, height: 0 };
  }
};

export default getImageOption;
