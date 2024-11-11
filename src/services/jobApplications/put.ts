import { JobApplicationUpdateData } from './types';
import { apiClient } from '~/config/apiClient';

export const updateJobApplication = (data: JobApplicationUpdateData) =>
  apiClient.put(`/job-applications/${data.id}`, data);
