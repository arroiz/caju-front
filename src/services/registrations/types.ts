import { Registration } from '~/types/registrations';

export type RegistrationServerData = Registration;

export type RegistrationCreationData = Omit<RegistrationServerData, 'id'>;

export type RegistrationUpdateData = Partial<Registration>;

export type RegistrationListResponse = RegistrationServerData[];

export type RegistrationListParams = {
  cpf?: string;
};

export type RegistrationDeleteParams = Pick<RegistrationServerData, 'id'>;
