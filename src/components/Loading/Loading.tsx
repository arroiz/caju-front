import * as S from './styles';

type LoadingProps = {
  isCentered?: boolean;
};

export const Loading = ({ isCentered }: LoadingProps) => (
  <S.LoadingContainer isCentered={isCentered} aria-label="carregando">
    <S.LoadingDots />
  </S.LoadingContainer>
);
