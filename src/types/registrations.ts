import { REGISTRATION_STATUS } from './status';

export type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: REGISTRATION_STATUS;
  cpf: string;
};

export type RegistrationListByStatus = {
  [key in REGISTRATION_STATUS]: Registration[];
};
