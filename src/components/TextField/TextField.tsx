import { InputHTMLAttributes } from 'react';
import * as S from './styles';

type Props = {
  label?: string;
  errorMessage?: string;
  isInvalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({ errorMessage, isInvalid, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input {...props} aria-invalid={isInvalid || props['aria-invalid']} />
      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
    </div>
  );
};
