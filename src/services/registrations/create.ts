import { apiClient } from '~/config/apiClient';
import { RegistrationCreationData } from './types';

export const createRegistrationService = (data: RegistrationCreationData) =>
  apiClient.post('/registrations', data);
