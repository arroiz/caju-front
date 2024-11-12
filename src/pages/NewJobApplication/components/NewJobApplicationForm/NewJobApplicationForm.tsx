import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/Input';
import { Button } from '~/components/Button';
import * as S from './styles';
import { getMaskedCpf, isValidCpf } from '~/helpers/cpf';
import { useCallback } from 'react';

const schema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  employeeName: z
    .string()
    .min(2, 'O nome completo deve ter pelo menos 2 letras.')
    .regex(/^\D.*/, 'O nome completo não pode começar com um número.')
    .regex(/^.*\s.*$/, 'O nome completo deve ter pelo menos um espaço.'),
  cpf: z.string().refine(isValidCpf, { message: 'CPF inválido.' }),
  applicationDate: z
    .string()
    .refine((data) => !isNaN(Date.parse(data)), { message: 'Data de admissão inválida.' }),
});

type NewApplicationFormData = z.infer<typeof schema>;

type NewJobApplicationFormProps = {
  onSubmit: (values: NewApplicationFormData) => void;
};

export const NewJobApplicationForm = ({ onSubmit }: NewJobApplicationFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<NewApplicationFormData>({
    resolver: zodResolver(schema),
  });

  const handleUpdateCpf = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cpfMasked = getMaskedCpf(event.target.value);
      setValue('cpf', cpfMasked, {
        shouldValidate: isSubmitted,
      });
    },
    [isSubmitted, setValue],
  );

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Nome"
        label="Nome"
        isInvalid={Boolean(errors.employeeName)}
        errorMessage={errors.employeeName?.message}
        {...register('employeeName')}
      />
      <Input
        placeholder="Email"
        label="Email"
        type="email"
        {...register('email')}
        isInvalid={Boolean(errors.email)}
        formNoValidate
        errorMessage={errors.email?.message}
      />
      <Input
        placeholder="CPF"
        label="CPF"
        {...register('cpf')}
        isInvalid={Boolean(errors.cpf)}
        errorMessage={errors.cpf?.message}
        onChange={handleUpdateCpf}
        maxLength={14}
      />
      <Input
        label="Data de admissão"
        data-testid="application-date-input"
        type="date"
        {...register('applicationDate')}
        isInvalid={Boolean(errors.applicationDate)}
        errorMessage={errors.applicationDate?.message}
      />
      <Button type="submit" disabled={isSubmitting}>
        Cadastrar
      </Button>
    </S.Form>
  );
};
