export const CHECK_DIGITS_INDEXES = [9, 10];

export const isValidFormat = (cpf: string): boolean => /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);

export const onlyNumbers = (input: string | number): string => String(input).replace(/[^\d]/g, '');

export const RESERVED_NUMBERS = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
];

export const isReservedNumber = (cpf: string): boolean => RESERVED_NUMBERS.indexOf(cpf) >= 0;

export const generateChecksum = (base: string | number, weight: number | number[]): number => {
  const digits = onlyNumbers(base);

  const weights =
    typeof weight === 'number'
      ? Array(digits.length)
          .fill(0)
          .map((_, i) => weight - i)
      : weight;

  return digits.split('').reduce((acc, digit, i) => acc + parseInt(digit, 10) * weights[i], 0);
};

export const isValidChecksum = (cpf: string): boolean => {
  return CHECK_DIGITS_INDEXES.every((i) => {
    const mod =
      generateChecksum(
        cpf
          .slice(0, i)
          .split('')
          .reduce((acc, digit) => acc + digit, ''),
        i + 1,
      ) % 11;

    return cpf[i] === String(mod < 2 ? 0 : 11 - mod);
  });
};

export const isValidCpf = (cpf: string): boolean => {
  if (!cpf || typeof cpf !== 'string') return false;

  const digits = onlyNumbers(cpf);

  return isValidFormat(cpf) && !isReservedNumber(digits) && isValidChecksum(digits);
};

export const getMaskedCpf = (value: string): string =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
