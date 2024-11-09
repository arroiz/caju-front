import { PropsWithChildren } from 'react';
import * as S from './styles';

type HeaderProps = PropsWithChildren<{}>;

export const Header = ({ children }: HeaderProps) => (
  <S.Root>
    <S.Header>{children}</S.Header>
  </S.Root>
);

export const HeaderTitle = S.Title;
