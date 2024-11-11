import { apiClient } from '~/config/apiClient';
import { JobApplicationCreationData, JobApplicationServerData } from './types';

export const createJobApplicationService = (data: JobApplicationCreationData) =>
  apiClient.post<JobApplicationServerData>('/job-applications', data);
