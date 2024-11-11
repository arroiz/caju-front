import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobApplicationDeleteParams } from '~/services/jobApplications/types';
import toast from 'react-hot-toast';
import { LIST_JOB_APPLICATIONS_QUERY_KEY } from './useListJobApplication';
import { deleteJobApplicationService } from '~/services/jobApplications/delete';

export const DELETE_JOB_APPLICATION_MUTATION_KEY = 'UPDATE_JOB_APPLICATION_MUTATION_KEY';

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_JOB_APPLICATION_MUTATION_KEY],
    mutationFn: (data: JobApplicationDeleteParams) => deleteJobApplicationService(data),
    onError: () => toast.error('Erro ao deletar candidatura'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_JOB_APPLICATIONS_QUERY_KEY],
      });
      toast.success('Candidatura deletada com sucesso');
    },
  });
};
