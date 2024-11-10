import { useCallback, useEffect, useState } from 'react';
import { getMaskedCpf, isValidCpf } from '~/helpers/cpf';

export const useCpf = () => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const setCpf = useCallback((newCpf: string) => {
    setValue(getMaskedCpf(newCpf));
  }, []);

  useEffect(() => {
    const newValidation = isValidCpf(value);
    if (isValid !== newValidation) {
      setIsValid(newValidation);
    }
  }, [value, isValid]);

  return {
    cpf: value,
    setCpf,
    isValid,
  };
};
