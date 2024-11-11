import { JobApplication } from '~/types/jobApplication';

export type JobApplicationServerData = JobApplication;

export type JobApplicationCreationData = Omit<JobApplicationServerData, 'id'>;

export type JobApplicationUpdateData = Partial<JobApplication>;

export type JobApplicationListResponse = JobApplicationServerData[];

export type JobApplicationListParams = {
  cpf?: string;
};

export type JobApplicationDeleteParams = Pick<JobApplicationServerData, 'id'>;
