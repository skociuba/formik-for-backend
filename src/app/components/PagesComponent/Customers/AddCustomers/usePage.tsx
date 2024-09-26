import {useApiMutation} from '../../../hooks/api/useApiMutation';
import {useForm} from '../../useForm';

import {initialValues,exampleValidationSchema as validationSchema} from './pageModel';
export const usePage = ({oldValues, handleSubmit}) => {
  const {mutate} = useApiMutation({
    route: 'TODO_ADD',
    method: 'POST',
  });
  const form = useForm({
    initialValues: {...initialValues, ...oldValues},
    validationSchema,
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
    form,
  };
};
