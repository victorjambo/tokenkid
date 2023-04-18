export const getFirstOrString = (
  param: string | string[] | undefined
): string | undefined => {
  if (!param) return;

  if (typeof param === 'string') {
    return param;
  }

  return param[0];
};
