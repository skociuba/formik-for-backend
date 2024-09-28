import {useRouter} from 'next/navigation';

import {useApiQuery} from '@/hooks/api/useApiQuery';
export const usePage = () => {
  const {data, isLoading, error, refetch} = useApiQuery({
    route: 'CUSTOMERS',
  });
  const router = useRouter();
  return {
    data,
    isLoading,
    error,
    router,
    refetch,
  };
};
