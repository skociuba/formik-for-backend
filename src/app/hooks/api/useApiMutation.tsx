import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';

import {ApiKeysType} from './apiEndpoints';
import {fetchRequest} from './../../lib/api';

export type UseApiMutationProps = {
  route: ApiKeysType;
  getFile?: boolean;
  id?: string;
  params?: {[key: string]: string};
  method: 'POST' | 'PUT' | 'DELETE' | 'GET';
};

export type ValueType = {
  [key: string]:
    | string
    | number
    | boolean
    | File
    | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | {[key: string]: any}
    | {[key: string]: any}[];
};

export const useApiMutation = ({...props}: UseApiMutationProps) => {
  const [error, setError] = useState<string | null>(); //TODO to delete
  const [errors, setErrors] = useState<{[key: string]: string} | undefined>();

  const {mutate} = useMutation({
    mutationFn: (values: ValueType) => {
      setError(null);
      return fetchRequest({
        values,
        ...props,
      })
        .then((data) => {
          if (data?.reset_token) {
            return data;
          }

          if (data?.error) {
            setError(data.error);
          }

          if (data?.errors) {
            setErrors(data.errors);
          }

          return data;
        })
        .catch((err) => err);
    },
  });

  return {mutate, error, errors};
};
