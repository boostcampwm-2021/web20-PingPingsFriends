export const compareTime = (from: Date, to: Date) => {
  const milliDiff = from.getTime() - to.getTime();
  const hourDiff = Math.floor(milliDiff / (60 * 60 * 1000));
  if (hourDiff < 24) return hourDiff.toString() + '시간 전';
  return Math.floor(hourDiff / 24).toString() + '일 전';
};
