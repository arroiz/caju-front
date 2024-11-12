import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState } from 'react';
import { listJobApplicationService } from '~/services/jobApplications';
import {
  JobApplicationListParams,
  JobApplicationListResponse,
} from '~/services/jobApplications/types';

export const LIST_JOB_APPLICATIONS_QUERY_KEY: string = 'LIST_JOB_APPLICATIONS_QUERY_KEY';

type useListJobApplicationsParams = {
  params: JobApplicationListParams;
} & Omit<UseQueryOptions<JobApplicationListResponse, Error>, 'queryKey' | 'queryFn'>;

export const useListJobApplications = (
  { params, ...options }: useListJobApplicationsParams = { params: {} },
) => {
  const [searchFilters, setSearchFilters] = useState<JobApplicationListParams>(params);

  const query = useQuery({
    ...options,
    queryKey: [LIST_JOB_APPLICATIONS_QUERY_KEY, searchFilters],
    meta: {
      errorMessage: 'Falha ao carregar candidaturas.',
    },
    queryFn: async () => listJobApplicationService(searchFilters),
  });

  return { ...query, setSearchFilters };
};
