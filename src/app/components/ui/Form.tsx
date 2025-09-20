import {FormikContextType, FormikProvider, FormikValues} from 'formik';
import {PropsWithChildren} from 'react';

export type FormType = {
  className?: string;
  form: FormikContextType<FormikValues>;
} & Pick<any, 'children'> &
  PropsWithChildren;

export const Form = ({children, className, form}: FormType) => (
  <FormikProvider value={form}>
    <form onSubmit={form.handleSubmit}>
      <fieldset disabled={form.isSubmitting} className={className}>
        {children}
      </fieldset>
    </form>
  </FormikProvider>
);
