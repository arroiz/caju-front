import { useCallback, useState } from 'react';
import { HiOutlineX, HiRefresh } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Input } from '~/components/Input';
import { routes } from '~/router/routes';
import * as S from './styles';
import { JobApplicationListParams } from '~/services/jobApplications/types';
import { getMaskedCpf, isValidCpf, onlyNumbers } from '~/helpers/cpf';

type SearchBarProps = {
  onSearch: (params: JobApplicationListParams) => void;
  onRefetch: () => void;
  isLoading: boolean;
};

export const SearchBar = ({ onSearch, onRefetch, isLoading }: SearchBarProps) => {
  const [cpf, setCpf] = useState<string>('');

  const onReset = useCallback(() => {
    setCpf('');
    onSearch({ cpf: '' });
  }, [onSearch]);

  const handleUpdateCpf = useCallback(
    (newCpf: string) => {
      const maskedCpf = getMaskedCpf(newCpf);
      const isValid = isValidCpf(maskedCpf);

      setCpf(maskedCpf);

      if (isValid) {
        onSearch({
          cpf: onlyNumbers(maskedCpf),
        });
      }
    },
    [onSearch],
  );

  return (
    <S.Container>
      <S.InputCpfContainer>
        <Input
          value={cpf}
          onChange={(event) => handleUpdateCpf(event.target.value)}
          placeholder="Digite um CPF válido"
          maxLength={14}
        />
        {cpf.length > 0 ? (
          <IconButton onClick={onReset} aria-label="limpar campo" $colorScheme="danger">
            <HiOutlineX size={16} />
          </IconButton>
        ) : null}
      </S.InputCpfContainer>
      <S.Actions>
        <IconButton aria-label="recarregar" disabled={isLoading} onClick={onRefetch}>
          <HiRefresh />
        </IconButton>
        <Button as={Link} xpto="teste" to={routes.newJobApplication}>
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
