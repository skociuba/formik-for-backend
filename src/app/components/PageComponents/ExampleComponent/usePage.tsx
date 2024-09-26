import {useRouter} from 'next/navigation';

import {useApiQuery} from '../../../hooks/api/useApiQuery';
export const usePage = () => {
  const {data, isLoading, error} = useApiQuery({
    route: 'TODOS',
  });
  const router = useRouter();
  return {
    data,
    isLoading,
    error,
    router,
  };
};
