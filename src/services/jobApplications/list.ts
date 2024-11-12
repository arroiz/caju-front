import { JobApplicationListParams, JobApplicationListResponse } from './types';
import { apiClient } from '~/config/apiClient';

export const listJobApplicationService = async ({ cpf }: JobApplicationListParams) => {
  const response = await apiClient.get<JobApplicationListResponse>('/job-applications', {
    params: {
      ...(cpf ? { cpf } : {}),
    },
  });

  return response.data;
};
