import { useFormikContext } from 'formik';

import { Without } from '@/lib/api';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import Root, {
  SelectProps as RootProps,
  ValueType,
} from '@/components/commons/Form/Ui/Select/Select';

export type SelectProps = {
  label?: string;
  handleChange?: (val: any) => void;
} & Without<RootProps, 'onChange'>;

export const Select = ({ className, handleChange, ...props }: SelectProps) => {
  const { formFieldProps, childProps } = useFormField(props);
  const { getFieldMeta, setFieldValue } = useFormikContext();
  const { value, error } = getFieldMeta<ValueType>(props.name);

  return (
    <FormField {...{ ...formFieldProps, className: 'relative' }}>
      <Root
        {...{
          ...childProps,
          value,
          error,
          className,
          onChange: handleChange
            ? handleChange
            : (val) => setFieldValue(props.name, val),
        }}
      />
    </FormField>
  );
};
