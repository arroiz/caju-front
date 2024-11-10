import * as S from './styles';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '~/components/IconButton';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '~/router/routes';
import { NewJobApplicationForm } from './components/NewJobApplicationForm/NewJobApplicationForm';
import { useCreateRegistration } from '~/hooks/useCreateRegistration';
import { RegistrationCreationData } from '~/services/registrations/types';
import { REGISTRATION_STATUS } from '~/types/status';

const dateFormat = (inputDate: string) => {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
};

export const NewJobApplication = () => {
  const { mutateAsync: createNewJobApplication } = useCreateRegistration();
  const history = useHistory();

  const handleSubmit = async (data: Omit<RegistrationCreationData, 'status'>) => {
    await createNewJobApplication({
      ...data,
      status: REGISTRATION_STATUS.REVIEW,
      admissionDate: dateFormat(dateFormat(data.admissionDate)),
    });
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton as={Link} to={routes.dashboard} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <NewJobApplicationForm onSubmit={handleSubmit} />
      </S.Card>
    </S.Container>
  );
};
