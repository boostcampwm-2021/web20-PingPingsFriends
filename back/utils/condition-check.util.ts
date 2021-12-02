export function isAllTrueOrFalse(...args: any[]): boolean {
  const isAllTrue = !args.some((v) => !v);
  const isAllFalse = !args.some((v) => v);

  if (isAllTrue || isAllFalse) return true;
  return false;
}
