import * as S from './styles';
import RegistrationCard from '../RegistrationCard';
import { REGISTRATION_STATUS } from '~/types/status';
import { Registration } from '~/types/registrations';
const allColumns = [
  { status: REGISTRATION_STATUS.REVIEW, title: 'Pronto para revisar' },
  { status: REGISTRATION_STATUS.APPROVED, title: 'Aprovado' },
  { status: REGISTRATION_STATUS.REPROVED, title: 'Reprovado' },
];

type Props = {
  registrations: { [key in REGISTRATION_STATUS]: Registration[] };
};

const Collumns = ({ registrations }: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>{collum.title}</S.TitleColumn>
              <S.CollumContent>
                {registrations[collum.status].map((registration) => {
                  return <RegistrationCard data={registration} key={registration.id} />;
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
