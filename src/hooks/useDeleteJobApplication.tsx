import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobApplicationDeleteParams } from '~/services/jobApplications/types';
import { LIST_JOB_APPLICATIONS_QUERY_KEY } from './useListJobApplication';
import { deleteJobApplicationService } from '~/services/jobApplications/delete';

export const DELETE_JOB_APPLICATION_MUTATION_KEY = 'UPDATE_JOB_APPLICATION_MUTATION_KEY';

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_JOB_APPLICATION_MUTATION_KEY],
    mutationFn: (data: JobApplicationDeleteParams) => deleteJobApplicationService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_JOB_APPLICATIONS_QUERY_KEY],
      });
    },
  });
};
