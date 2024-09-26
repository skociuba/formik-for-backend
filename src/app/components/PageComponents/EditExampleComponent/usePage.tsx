import {useApiMutation} from '../../../hooks/api/useApiMutation';
import {useForm} from '../../useForm';
import {useApiQuery} from '../../../hooks/api/useApiQuery';

import {initialValues} from './pageModel';
export const usePage = ({oldValues, handleSubmit, id}) => {
  const {data, isLoading, error} = useApiQuery({
    route: 'TODO',
    params: {
      id: id,
    },
  });
  const {mutate} = useApiMutation({
    route: 'TODO_UPDATE',
    method: 'PUT',
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
