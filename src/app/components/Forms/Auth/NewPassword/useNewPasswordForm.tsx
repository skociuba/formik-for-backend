import {useApiMutation} from '@/hooks/api/useApiMutation';

import {NewPasswordFormType} from './NewPasswordForm';
import {
  initialValues,
  newPasswordValidationSchema as validationSchema,
} from './NewPasswordFormModel';

import {useForm} from '@/components/commons/Form/useForm';

export const useNewPasswordForm = ({
  token,
  email,
  handleSubmit,
  ...props
}: NewPasswordFormType) => {
  const {mutate, isLoading, error} = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    checkPassword: true,
    onSubmit: async (values) => {
      mutate(
        {...values, token, email},
        {
          onSuccess: ({error}) => (error ? null : handleSubmit()),
        },
      );
    },
  });

  return {form, error, isLoading};
};
