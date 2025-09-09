import {useQuery} from '@tanstack/react-query';
import {toast} from 'react-toastify';

import {ApiKeysType} from './apiEndpoints';
import {fetchRequest} from './../../lib/api';

export type UseApiQueryProps = {
  route: ApiKeysType;
  getFile?: boolean;
  id?: string;
  refresh?: boolean;
  params?: {[key: string]: string};
  values?: {[key: string]: string | number | boolean | File | null};
};

export const useApiQuery = ({refresh, ...props}: UseApiQueryProps) => {
  const {route, id, params} = props;
  const paramsArr = params ? [...Object.values(params)] : [];

  const {data, ...query} = useQuery({
    queryKey: [route, id, ...paramsArr],
    queryFn: () =>
      fetchRequest({
        method: 'GET',
        ...props,
      }).then((fetchData) => {
        if (fetchData?.status && fetchData.status === 403) {
          toast('Brak dostepu', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            type: 'error',
            theme: 'colored',
          });
        }
        return fetchData;
      }),
  });

  return {data: data?.data, ...query};
};
