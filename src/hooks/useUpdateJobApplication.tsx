import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateJobApplication } from '~/services/jobApplications';
import { JobApplicationUpdateData } from '~/services/jobApplications/types';
import toast from 'react-hot-toast';
import { LIST_JOB_APPLICATIONS_QUERY_KEY } from './useListJobApplication';

export const UPDATE_JOB_APPLICATION_MUTATION_KEY = 'UPDATE_JOB_APPLICATION_MUTATION_KEY';

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [UPDATE_JOB_APPLICATION_MUTATION_KEY],
    mutationFn: (data: JobApplicationUpdateData) => updateJobApplication(data),
    onError: () => toast.error('Erro ao alterar candidatura'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_JOB_APPLICATIONS_QUERY_KEY],
      });
      toast.success('Candidatura alterada com sucesso');
    },
  });
};
