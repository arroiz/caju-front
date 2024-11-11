import { QueryClient, QueryCache } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query) => {
      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage);
      }
    },
  }),
});
