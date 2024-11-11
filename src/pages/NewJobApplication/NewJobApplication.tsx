import * as S from './styles';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '~/components/IconButton';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '~/router/routes';
import { NewJobApplicationForm } from './components/NewJobApplicationForm/NewJobApplicationForm';
import { useCreateJobApplication } from '~/hooks/useCreateJobApplication';
import { JobApplicationCreationData } from '~/services/jobApplications/types';
import { JOB_APPLICATION_STATUS } from '~/types/status';
import { onlyNumbers } from '~/helpers/cpf';

const dateFormat = (inputDate: string) => {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
};

export const NewJobApplication = () => {
  const { mutateAsync: createNewJobApplication } = useCreateJobApplication();
  const history = useHistory();

  const handleSubmit = async (data: Omit<JobApplicationCreationData, 'status'>) => {
    await createNewJobApplication({
      ...data,
      status: JOB_APPLICATION_STATUS.REVIEW,
      applicationDate: dateFormat(data.applicationDate),
      cpf: onlyNumbers(data.cpf),
    });
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton as={Link} to={routes.dashboard} aria-label="voltar">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <NewJobApplicationForm onSubmit={handleSubmit} />
      </S.Card>
    </S.Container>
  );
};
