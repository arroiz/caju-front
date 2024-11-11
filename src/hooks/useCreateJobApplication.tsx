import { useMutation } from '@tanstack/react-query';
import {
  createJobApplicationService,
  JobApplicationCreationData,
} from '~/services/jobApplications';
import toast from 'react-hot-toast';

export const CREATE_JOB_APPLICATION_MUTATION_KEY = 'CREATE_JOB_APPLICATION_MUTATION_KEY';

export const useCreateJobApplication = () =>
  useMutation({
    mutationKey: [CREATE_JOB_APPLICATION_MUTATION_KEY],
    mutationFn: (data: JobApplicationCreationData) => createJobApplicationService(data),
    onError: () => toast.error('Erro ao salvar candidatura'),
    onSuccess: () => toast.success('Nova candidatura criada com sucesso'),
  });
