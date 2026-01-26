export const generateBackHalf = (length: number = 5): string => {
  const char: string =
    '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let backHalf: string = '';

  for (let i = 0; i < length; i++) {
    backHalf += char[Math.floor(Math.random() * char.length)];
  }

  return backHalf;
};
