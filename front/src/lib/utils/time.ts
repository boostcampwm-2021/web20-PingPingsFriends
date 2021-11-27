import TIME from '@lib/constants/timeUnit';

export const compareTime = (from: Date, to: Date) => {
  const milliDiff = from.getTime() - to.getTime();
  const hourDiff = Math.floor(milliDiff / (60 * 60 * 1000));
  if (hourDiff < 24) return hourDiff.toString() + '시간 전';
  return Math.floor(hourDiff / 24).toString() + '일 전';
};

export const formatDate = (sqlDate: string) => {
  if (!sqlDate.length) {
    return '내역 없음';
  }
  const [date, time] = sqlDate.split('T');
  const [YYYY, MM, DD] = date.split('-');
  const [hh, mm] = time.split(':');

  const publishedStampTime = new Date(+YYYY, +MM - 1, +DD, +hh, +mm).getTime();
  const currentStampTime = new Date().getTime();

  const second = Math.floor((currentStampTime - publishedStampTime) / TIME.MS);

  //todo: 이전에 sqlDate를 변환해주는 함수 구현한 걸 그대로 가져와서 타입 정의가 필요함
  // 가장 큰 단위의 날짜를 반환해줌 ex)1년 전, 5개월 전, 3주 전, 30초 전...
  const pastDate = pipe(divisionYear, divisionMonth, divisionWeek, divisionDay, divisionHour, divisionMin)(second);

  return typeof pastDate === 'number' ? `${pastDate}초 전` : `${pastDate[1]} ${pastDate[0]} 전`;
};

const divisionYear = (second: any): any => {
  const quotient = second / TIME.YEAR;
  return quotient >= 1 ? ['년', quotient.toFixed(0)] : second;
};
const divisionMonth = (second: any): any => {
  const quotient = second / TIME.MONTH;
  return quotient >= 1 ? ['개월', quotient.toFixed(0)] : second;
};
const divisionWeek = (second: any): any => {
  const quotient = second / TIME.WEEK;
  return quotient >= 1 ? ['주', quotient.toFixed(0)] : second;
};
const divisionDay = (second: any): any => {
  const quotient = second / TIME.DAY;
  return quotient >= 1 ? ['일', quotient.toFixed(0)] : second;
};
const divisionHour = (second: any): any => {
  const quotient = second / 3600;
  return quotient >= 1 ? ['시간', quotient.toFixed(0)] : second;
};
const divisionMin = (second: any): any => {
  const quotient = second / 60;
  return quotient >= 1 ? ['분', quotient.toFixed(0)] : second;
};

const pipe =
  (...functions: any[]) =>
  (init: any) => {
    return functions.reduce((value, func) => {
      return func(value);
    }, init);
  };
