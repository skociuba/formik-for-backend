import {useApiMutation} from'@/hooks/api/useApiMutation';
import {useForm} from '@/components/useForm';
import {useApiQuery} from '@/hooks/api/useApiQuery';

import {initialValues} from './pageModel';
export const usePage = ({oldValues, handleSubmit, id}) => {
  const {data, isLoading, error} = useApiQuery({
    route: 'CUSTOMER',
    params: {
      id: id,
    },
  });
  const {mutate} = useApiMutation({
    route: 'CUSTOMERS_EDIT',
    method: 'POST',
    params: {
      id,
    },
  });

  const form = useForm({
    initialValues: {...initialValues, ...oldValues},
    onSubmit: async (values) => {
      const sendValues = {...values};
      mutate(
        {
          _method:'PUT',
          ...sendValues,
        },
        {
          onSuccess: ({error}) => {
            if (!error) {
              handleSubmit();
            }
          },
        },
      );
    },
  });

  return {
    data,
    isLoading,
    error,
    form,
  };
};
