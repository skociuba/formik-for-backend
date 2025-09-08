import * as Yup from 'yup';

import {validationSchema} from '@/lib/validation';
import {useApiMutation} from '@/hooks/api/useApiMutation';
import {useApiQuery} from '@/hooks/api/useApiQuery';
import {FormProps} from '@/components/Forms/@types/Form';

import {initialValues, registerValidationSchema} from './RegisterFormModel';

import {useForm} from '@/components/commons/Form/useForm';

export type Statement = {
  id: string;
  name: string;
  code: string;
  version: string;
  location: string;
  status: string;
  start_date: string;
  end_date: string;
  required: boolean;
  description: string;
};

export const useRegisterForm = ({handleSubmit, ...props}: FormProps) => {
  const {mutate, isLoading, errors} = useApiMutation(props);

  const {data, isLoading: areStatementsLoading} = useApiQuery({
    route: 'ADMINISTRATION_CONTENT',
    values: {
      statement: 'registration_form',
    },
  });

  const statements = data?.statement || [];

  const customAgreements: {
    [key: string]: any;
  } = {};

  statements?.forEach((statement: Statement, index: number) => {
    customAgreements[`customAgreement${index + 1}`] = statement.required
      ? validationSchema.global.checkboxRequired
      : validationSchema.global.checkbox;
  });

  const customAgreementsSchema = Yup.object({...customAgreements});

  const newValidation = Yup.object({
    ...registerValidationSchema.fields,
    ...customAgreementsSchema.fields,
  });

  const agreementsInitialValues: {
    [key: string]: string;
  } = {};

  statements.forEach(
    (statement: Statement, index: number) =>
      (agreementsInitialValues[`customAgreement${index + 1}`] = '0'),
  );

  const form = useForm({
    initialValues: {...initialValues, ...agreementsInitialValues},
    validationSchema: newValidation,
    checkPassword: true,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({error}) => (error ? null : handleSubmit()),
      });
    },
  });

  return {form, errors, isLoading, statements, areStatementsLoading};
};
