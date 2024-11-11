import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState } from 'react';
import { listJobApplicationService } from '~/services/jobApplications';
import { JobApplicationListParams } from '~/services/jobApplications/types';
import { JobApplicationListByStatus } from '~/types/jobApplication';
import { JOB_APPLICATION_STATUS } from '~/types/status';

export const LIST_JOB_APPLICATIONS_QUERY_KEY: string = 'LIST_JOB_APPLICATIONS_QUERY_KEY';

type useListJobApplicationsParams = {
  params: JobApplicationListParams;
} & Omit<UseQueryOptions<JobApplicationListByStatus, Error>, 'queryKey' | 'queryFn'>;

const INITIAL_DATA = {
  [JOB_APPLICATION_STATUS.APPROVED]: [],
  [JOB_APPLICATION_STATUS.REPROVED]: [],
  [JOB_APPLICATION_STATUS.REVIEW]: [],
};

export const useListJobApplications = (
  { params, ...options }: useListJobApplicationsParams = { params: {} },
) => {
  const [searchFilters, setSearchFilters] = useState(params);

  const query = useQuery({
    ...options,
    queryKey: [LIST_JOB_APPLICATIONS_QUERY_KEY, searchFilters],
    meta: {
      errorMessage: 'Falha ao carregar candidaturas.',
    },
    queryFn: async () => {
      const data = await listJobApplicationService(searchFilters);

      const jobApplicationList = data.reduce((acc, currentJobApplication) => {
        const currentStatus = currentJobApplication.status;

        return {
          ...acc,
          [currentStatus]: [...acc[currentStatus], currentJobApplication],
        };
      }, INITIAL_DATA);

      return jobApplicationList;
    },
  });

  return { ...query, setSearchFilters };
};
