import { useQuery } from '@tanstack/react-query';
import { listRegistrationService } from '~/services/registrations';
import { RegistrationListParams } from '~/services/registrations/types';
import { REGISTRATION_STATUS } from '~/types/status';
export const LIST_REGISTRATIONS_QUERY_KEY: string = 'LIST_REGISTRATIONS_QUERY_KEY';

export const useListRegistrations = (params: RegistrationListParams = {}) =>
  useQuery({
    queryKey: [LIST_REGISTRATIONS_QUERY_KEY, params],
    queryFn: async () => {
      const data = await listRegistrationService(params);

      const registrationList = data.reduce(
        (acc, currentRegistration) => {
          const currentStatus = currentRegistration.status;

          return {
            ...acc,
            [currentStatus]: [...acc[currentStatus], currentRegistration],
          };
        },
        {
          [REGISTRATION_STATUS.APPROVED]: [],
          [REGISTRATION_STATUS.REPROVED]: [],
          [REGISTRATION_STATUS.REVIEW]: [],
        },
      );

      console.log('registrationList', registrationList);

      return registrationList;
    },
  });
