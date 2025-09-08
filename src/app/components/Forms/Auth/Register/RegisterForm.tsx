import {FormProps} from '@/components/Forms/@types/Form';

import {Fields} from './components/Fields';
import {Terms} from './components/Terms';
import {useRegisterForm} from './useRegisterForm';

import {Form} from '@/components/commons/Form/Form';

export const RegisterForm = (props: FormProps) => {
  const {form, errors, isLoading, statements, areStatementsLoading} =
    useRegisterForm(props);

  return (
    <Form {...{form, className: 'flex flex-col gap-3'}}>
      <div className="w-full items-stretch lg:flex">
        <Fields />
        <Terms {...{errors, isLoading, statements, areStatementsLoading}} />
      </div>
    </Form>
  );
};
