import { HiRefresh } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Input } from '~/components/Input';
import { routes } from '~/router/routes';
import * as S from './styles';
import { useCpf } from '~/hooks/useCpf';
import { JobApplicationListParams } from '~/services/jobApplications/types';
import { useEffect } from 'react';

type SearchBarProps = {
  onSearch: (params: JobApplicationListParams) => void;
  onRefetch: () => void;
};

export const SearchBar = ({ onSearch, onRefetch }: SearchBarProps) => {
  const { cpf, setCpf, isValid } = useCpf();

  useEffect(() => {
    if (isValid) {
      onSearch({ cpf });
    }
  }, [cpf, isValid, onSearch]);

  return (
    <S.Container>
      <Input
        value={cpf}
        onChange={(event) => setCpf(event.target.value)}
        placeholder="Digite um CPF válido"
        maxLength={14}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={onRefetch}>
          <HiRefresh />
        </IconButton>
        <Button as={Link} to={routes.newJobApplication}>
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
