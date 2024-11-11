import { JobApplicationListParams, JobApplicationListResponse } from './types';
import { apiClient } from '~/config/apiClient';

export const listJobApplicationService = async (params: JobApplicationListParams) => {
  const response = await apiClient.get<JobApplicationListResponse>('/job-applications', {
    params,
  });

  return response.data;
};
