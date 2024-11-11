import { useCallback, useState } from 'react';
import { getMaskedCpf, isValidCpf } from '~/helpers/cpf';

const INITIAL_VALUE = {
  cpf: '',
  isValid: false,
};

export const useCpf = () => {
  const [state, setState] = useState(INITIAL_VALUE);

  const setCpf = useCallback((newCpf: string) => {
    const maskedCpf = getMaskedCpf(newCpf);
    const isValid = isValidCpf(maskedCpf);

    setState({
      cpf: maskedCpf,
      isValid,
    });
  }, []);

  return {
    setCpf,
    ...state,
  };
};
