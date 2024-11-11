import { JOB_APPLICATION_STATUS } from './status';

export type JobApplication = {
  id: string;
  applicationDate: string;
  email: string;
  employeeName: string;
  status: JOB_APPLICATION_STATUS;
  cpf: string;
};

export type JobApplicationListByStatus = {
  [key in JOB_APPLICATION_STATUS]: JobApplication[];
};
