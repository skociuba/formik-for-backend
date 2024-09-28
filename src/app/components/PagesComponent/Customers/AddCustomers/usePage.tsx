import {useApiMutation} from '@/hooks/api/useApiMutation';
import {useForm} from '@/components/useForm';
import {useRouter} from 'next/navigation';
import {initialValues,exampleValidationSchema as validationSchema} from './pageModel';
export const usePage = ({oldValues, handleSubmit}: {oldValues: any, handleSubmit: any}) => {
  const router = useRouter();
  const {mutate} = useApiMutation({
    route: 'CUSTOMERS_ADD',
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
          onSuccess: () => {

            router.push('/customers');

          },
        },
      );
    },
  });

  return {
    form,
  };
};
