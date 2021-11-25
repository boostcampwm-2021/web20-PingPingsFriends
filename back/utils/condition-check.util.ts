export function isAllTrueOrFalse(...args): boolean {
  const isAllTrue = args.every((v) => v);
  const isAllFalse = args.every((v) => !v);

  if (isAllTrue || isAllFalse) return true;
  return false;
}
