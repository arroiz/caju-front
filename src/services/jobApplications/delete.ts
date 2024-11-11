import { apiClient } from '~/config/apiClient';
import { JobApplicationDeleteParams } from './types';

export const deleteJobApplicationService = ({ id }: JobApplicationDeleteParams) =>
  apiClient.delete(`/job-applications/${id}`);
