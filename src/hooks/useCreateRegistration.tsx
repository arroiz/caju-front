import { useMutation } from '@tanstack/react-query';
import { createRegistrationService } from '~/services/registrations';
import { RegistrationCreationData } from '~/services/registrations/types';
import toast from 'react-hot-toast';

export const CREATE_REGISTRATION_MUTATION_KEY = 'CREATE_REGISTRATION_MUTATION_KEY';

export const useCreateRegistration = () =>
  useMutation({
    mutationKey: [CREATE_REGISTRATION_MUTATION_KEY],
    mutationFn: (data: RegistrationCreationData) => createRegistrationService(data),
    onError: () => toast.error('Erro ao salvar candidatura'),
    onSuccess: () => toast.success('Candidatura salva com sucesso'),
  });
