import { REGISTRATION_STATUS } from './status';

export type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: REGISTRATION_STATUS;
  cpf: string;
};
