import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateJobApplication } from '~/services/jobApplications';
import { JobApplicationUpdateData } from '~/services/jobApplications/types';
import { LIST_JOB_APPLICATIONS_QUERY_KEY } from './useListJobApplication';

export const UPDATE_JOB_APPLICATION_MUTATION_KEY = 'UPDATE_JOB_APPLICATION_MUTATION_KEY';

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [UPDATE_JOB_APPLICATION_MUTATION_KEY],
    mutationFn: (data: JobApplicationUpdateData) => updateJobApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_JOB_APPLICATIONS_QUERY_KEY],
      });
    },
  });
};
