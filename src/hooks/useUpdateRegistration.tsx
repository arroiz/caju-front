import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRegistration } from '~/services/registrations';
import { RegistrationUpdateData } from '~/services/registrations/types';
import toast from 'react-hot-toast';
import { LIST_REGISTRATIONS_QUERY_KEY } from './useListRegistration';

export const UPDATE_REGISTRATION_MUTATION_KEY = 'UPDATE_REGISTRATION_MUTATION_KEY';

export const useUpdateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [UPDATE_REGISTRATION_MUTATION_KEY],
    mutationFn: (data: RegistrationUpdateData) => updateRegistration(data),
    onError: () => toast.error('Erro ao salvar candidatura'),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_REGISTRATIONS_QUERY_KEY],
      });
      toast.success('Candidatura salva com sucesso');
    },
  });
};
