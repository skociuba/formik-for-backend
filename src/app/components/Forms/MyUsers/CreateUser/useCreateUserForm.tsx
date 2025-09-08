import {useState} from 'react';

import {useApiMutation} from '@/hooks/api/useApiMutation';

import {CreateUserFormProps} from './CreateUserForm';
import {
  createUserValidationSchema as validationSchema,
  initialValues,
} from './CreateUserFormModel';
import {CardData} from './Steps/CardData';
import {Summary} from './Steps/Summary';
import {UserData} from './Steps/UserData';

import {useForm} from '@/components/commons/Form/useForm';
import {filterObject} from '@/lib/helpers';

export const useCreateUserForm = ({
  handleSubmit,
  ...props
}: CreateUserFormProps) => {
  const [step, setStep] = useState<number>(0);
  const {mutate, isLoading, errors} = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema: validationSchema[step],
    onSubmit: async (values) => {
      if (step === 0) {
        return setStep((prev) => prev + 1);
      }

      let newNumber = values.card_number;
      if (values.card_type === 'city_card') {
        newNumber = values.card_number.replace(/\D/g, '').substring(1);
      }

      mutate(
        values.card === '1'
          ? {...values, card_number: newNumber}
          : filterObject(values, 'card'),
        {
          onSuccess: ({error}) => {
            if (!error) {
              handleSubmit();
              setStep((prev) => prev + 1);
            }
          },
        },
      );
    },
  });

  const stepComponent = [
    <UserData key="user-data" />,
    <CardData key="card-data" {...{params: errors}} />,
    <Summary key="summary" />,
  ];

  return {form, isLoading, step, setStep, stepComponent};
};
