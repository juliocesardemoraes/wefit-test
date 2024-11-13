export const validCNPJ = (value: string | number | number[] = "") => {
  if (!value) return false;

  const numericValue = value.toString().replace(/\D/g, "");

  if (numericValue.length !== 14) return false;

  const numbers = numericValue.split("").map(Number);

  const uniqueNumbers = [...new Set(numbers)];
  if (uniqueNumbers.length === 1) return false;

  const validCalc = (base: number) => {
    const weights =
      base === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const sum = numbers
      .slice(0, base)
      .reduce((acc, num, i) => acc + num * weights[i], 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit0 = validCalc(12);
  const digit1 = validCalc(13);

  return digit0 === numbers[12] && digit1 === numbers[13];
};
