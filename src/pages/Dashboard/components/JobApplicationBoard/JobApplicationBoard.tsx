import { JOB_APPLICATION_STATUS } from '~/types/status';
import { JobApplication } from '~/types/jobApplication';
import * as S from './styles';
import { JobApplicationColumn } from '../JobApplicationColumn/JobApplicationColumn';
import { useMemo } from 'react';

const allColumns = [
  { status: JOB_APPLICATION_STATUS.REVIEW, title: 'Pronto para revisar' },
  { status: JOB_APPLICATION_STATUS.APPROVED, title: 'Aprovado' },
  { status: JOB_APPLICATION_STATUS.REPROVED, title: 'Reprovado' },
];

type Props = {
  jobApplications?: { [key in JOB_APPLICATION_STATUS]: JobApplication[] };
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
