import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './styles';

type InputProps = {
  label?: string;
  errorMessage?: string;
  isInvalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isInvalid, errorMessage, ...inputProps } = props;

  return (
    <div>
      <S.Label htmlFor={inputProps.id}>{inputProps.label}</S.Label>
      <S.Input ref={ref} {...inputProps} aria-invalid={isInvalid || props['aria-invalid']} />
      <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
    </div>
  );
});
