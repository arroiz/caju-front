import { apiClient } from '~/config/apiClient';
import { RegistrationDeleteParams } from './types';

export const deleteRegistrationService = ({ id }: RegistrationDeleteParams) =>
  apiClient.delete(`/registrations/${id}`);
