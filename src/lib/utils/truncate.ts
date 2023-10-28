const truncate = (str: string | undefined, maxLength: number): string => {
  if (!str) return '';
  return str.length > maxLength
    ? str.slice(0, maxLength - 1) + '&hellip;'
    : str;
};

export { truncate };
