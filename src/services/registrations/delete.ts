import { apiClient } from '~/config/apiClient';
import { RegistrationDeleteProps } from './types';

export const deleteRegistrationService = ({ id }: RegistrationDeleteProps) =>
  apiClient.delete(`/${id}`);
