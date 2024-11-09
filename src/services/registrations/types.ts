import { Registration } from '~/types/registrations';

export type RegistrationServerData = Registration;

export type RegistrationCreationData = Omit<RegistrationServerData, 'id'>;

export type RegistrationUpdateData = Partial<RegistrationCreationData>;

export type RegistrationListResponse = RegistrationServerData[];

export type RegistrationListParams = {
  cpf?: string;
};

export type RegistrationDeleteProps = { id: Pick<RegistrationServerData, 'id'> };
