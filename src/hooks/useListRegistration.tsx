import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState } from 'react';
import { listRegistrationService } from '~/services/registrations';
import { RegistrationListParams } from '~/services/registrations/types';
import { RegistrationListByStatus } from '~/types/registrations';
import { REGISTRATION_STATUS } from '~/types/status';

export const LIST_REGISTRATIONS_QUERY_KEY: string = 'LIST_REGISTRATIONS_QUERY_KEY';

type useListRegistrationsParams = {
  params: RegistrationListParams;
} & Omit<UseQueryOptions<RegistrationListByStatus, Error>, 'queryKey' | 'queryFn'>;

const INITIAL_DATA = {
  [REGISTRATION_STATUS.APPROVED]: [],
  [REGISTRATION_STATUS.REPROVED]: [],
  [REGISTRATION_STATUS.REVIEW]: [],
};

export const useListRegistrations = (
  { params, ...options }: useListRegistrationsParams = { params: {} },
) => {
  const [searchFilters, setSearchFilters] = useState(params);

  const query = useQuery({
    ...options,
    queryKey: [LIST_REGISTRATIONS_QUERY_KEY, searchFilters],
    meta: {
      errorMessage: 'Falha ao carregar candidaturas.',
    },
    queryFn: async () => {
      const data = await listRegistrationService(searchFilters);

      const registrationList = data.reduce((acc, currentRegistration) => {
        const currentStatus = currentRegistration.status;

        return {
          ...acc,
          [currentStatus]: [...acc[currentStatus], currentRegistration],
        };
      }, INITIAL_DATA);

      return registrationList;
    },
  });

  return { ...query, setSearchFilters };
};
