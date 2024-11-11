import { REGISTRATION_STATUS } from '~/types/status';
import { Registration } from '~/types/registrations';
import * as S from './styles';
import { JobApplicationColumn } from '../JobApplicationColumn/JobApplicationColumn';
import { useMemo } from 'react';

const allColumns = [
  { status: REGISTRATION_STATUS.REVIEW, title: 'Pronto para revisar' },
  { status: REGISTRATION_STATUS.APPROVED, title: 'Aprovado' },
  { status: REGISTRATION_STATUS.REPROVED, title: 'Reprovado' },
];

type Props = {
  jobApplications?: { [key in REGISTRATION_STATUS]: Registration[] };
};

export const JobApplicationBoard = ({ jobApplications }: Props) => {
  const hasJobApplications = useMemo(
    () => jobApplications && Object.values(jobApplications).some((list) => list.length > 0),
    [jobApplications],
  );

  if (!hasJobApplications || jobApplications == undefined) {
    return <S.Description>Nenhuma candidatura disponível.</S.Description>;
  }

  return (
    <S.Container>
      {allColumns.map(({ status, title }) => (
        <JobApplicationColumn
          status={status}
          jobApplicationList={jobApplications[status]}
          title={title}
          key={title}
        />
      ))}
    </S.Container>
  );
};
