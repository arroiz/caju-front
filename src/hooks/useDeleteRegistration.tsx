import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegistrationDeleteParams } from '~/services/registrations/types';
import toast from 'react-hot-toast';
import { LIST_REGISTRATIONS_QUERY_KEY } from './useListRegistration';
import { deleteRegistrationService } from '~/services/registrations/delete';

export const DELETE_REGISTRATION_MUTATION_KEY = 'UPDATE_REGISTRATION_MUTATION_KEY';

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_REGISTRATION_MUTATION_KEY],
    mutationFn: (data: RegistrationDeleteParams) => deleteRegistrationService(data),
    onError: () => toast.error('Erro ao deletar candidatura'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_REGISTRATIONS_QUERY_KEY],
      });
      toast.success('Candidatura deletada com sucesso');
    },
  });
};
