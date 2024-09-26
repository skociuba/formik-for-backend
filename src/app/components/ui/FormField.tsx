import {useFormikContext} from 'formik';
import {PropsWithChildren} from 'react';

type FormFieldType = {
  id: string;
  name: string;
  label?: string;
  className?: string;
} & PropsWithChildren;

export const useFormField = <
  P extends Pick<FormFieldType, 'name' | 'label' | 'className'>,
>(
  props: P,
) => {
  const {label, name, className, ...otherProps} = props;
  const id = name;

  return {
    formFieldProps: {id, name, label, className},
    childProps: {...otherProps, id, name},
  };
};

export const FormField = ({children, name}: FormFieldType) => {
  const form = useFormikContext();
  const {error} = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(name);

  return <div className={'flex flex-col gap-2'}>{children}</div>;
};
