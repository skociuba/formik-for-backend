import {useFormikContext} from 'formik';
import {ComponentProps} from 'react';

import {clsxm} from '@/lib/clsxm';

type RadioBoxProps = {
  name: string;
  className?: string;
  variant?: 'small' | 'default';
} & ComponentProps<'input'>;

export const RadioBox = ({
  className,
  variant,
  children,
  value,
  ...props
}: RadioBoxProps) => {
  const form = useFormikContext();
  const {value: activeValue, error} = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(props.name);

  return (
    <>
      <div
        className={clsxm(
          'checkbox-container relative flex min-h-[32px] cursor-pointer items-start justify-start gap-5',
          variant === 'small' && 'checkbox-container-small min-h-[20px]',
        )}>
        <label
          className={clsxm(
            'text-gray flex min-h-[32px] cursor-pointer items-center text-base leading-6',
            variant === 'small' && 'min-h-[20px] text-black',
          )}>
          <input
            {...{
              ...props,
              value,
              checked: activeValue === value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                form.setFieldValue(props.name, e.target.value),
              type: 'radio',
            }}
            className={clsxm(
              'input-checkbox',
              variant === 'small' && 'input-checkbox-small',
              error && 'border-error focus:border-error',
              className,
            )}
          />
          <span className="checkmark absolute left-0 top-0">&nbsp;</span>
          {children}
        </label>
      </div>
      {error ? (
        <p className="ml-12 mt-2.5 text-xs text-error">{error}</p>
      ) : null}
    </>
  );
};
