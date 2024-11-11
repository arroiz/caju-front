import { JOB_APPLICATION_STATUS } from '~/types/status';
import { JobApplicationListByStatus } from '~/types/jobApplication';
import * as S from './styles';
import { lazy, Suspense, useMemo } from 'react';
import { JobApplicationListResponse } from '~/services/jobApplications';
import { Loading } from '~/components/Loading';

const JobApplicationColumn = lazy(() =>
  import('../JobApplicationColumn').then(({ JobApplicationColumn }) => ({
    default: JobApplicationColumn,
  })),
);

const INITIAL_DATA: JobApplicationListByStatus = {
  [JOB_APPLICATION_STATUS.APPROVED]: [],
  [JOB_APPLICATION_STATUS.REPROVED]: [],
  [JOB_APPLICATION_STATUS.REVIEW]: [],
};

const getJobApplicationByStatus = (jobApplicationList: JobApplicationListResponse = []) =>
  jobApplicationList.reduce((acc, currentJobApplication) => {
    const currentStatus = currentJobApplication.status;

    return {
      ...acc,
      [currentStatus]: [...acc[currentStatus], currentJobApplication],
    };
  }, INITIAL_DATA);

const allColumns = [
  { status: JOB_APPLICATION_STATUS.REVIEW, title: 'Pronto para revisar' },
  { status: JOB_APPLICATION_STATUS.APPROVED, title: 'Aprovado' },
  { status: JOB_APPLICATION_STATUS.REPROVED, title: 'Reprovado' },
];

type JobApplicationBoardProps = {
  jobApplicationList?: JobApplicationListResponse;
};

export const JobApplicationBoard = ({ jobApplicationList }: JobApplicationBoardProps) => {
  const hasJobApplications = useMemo(
    () => jobApplicationList && jobApplicationList.length > 0,
    [jobApplicationList],
  );

  const jobApplicationByStatus = useMemo(
    () => getJobApplicationByStatus(jobApplicationList),
    [jobApplicationList],
  );

  if (!hasJobApplications) {
    return <S.Description>Nenhuma candidatura disponível.</S.Description>;
  }

  return (
    <S.Container>
      {allColumns.map(({ status, title }) => (
        <Suspense fallback={<Loading isCentered />} key={title}>
          <JobApplicationColumn
            status={status}
            jobApplicationList={jobApplicationByStatus[status]}
            title={title}
          />
        </Suspense>
      ))}
    </S.Container>
  );
};
