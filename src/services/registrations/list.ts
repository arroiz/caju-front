import { RegistrationListParams, RegistrationListResponse } from './types';
import { apiClient } from '~/config/apiClient';

export const listRegistrationService = async (params: RegistrationListParams) => {
  const response = await apiClient.get<RegistrationListResponse>('/registrations', {
    params,
  });

  return response.data;
};
