import useTranslation from 'next-translate/useTranslation';

import { Checkbox } from '@/components/commons/Form/Fields/Checkbox';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { FormMessage } from '@/components/commons/Form/FormMessage';
// import { Link } from '@/components/commons/Link';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';
import { Statement } from '@/components/Forms/Auth/Register/useRegisterForm';

export const Terms = ({
  errors,
  statements,
  isLoading,
  areStatementsLoading,
}: {
  errors?: { [key: string]: string };
  statements: Statement[];
  isLoading: boolean;
  areStatementsLoading: boolean;
}) => {
  const { t } = useTranslation('form');

  return (
    <div className='w-full px-0 pt-0 md:px-9 lg:flex lg:w-1/2 lg:px-0 lg:pt-8'>
      <div className='w-full pl-0 lg:max-w-[620px] lg:pl-10'>
        <div className='mx-auto flex max-w-[620px] flex-col gap-5 pt-5 pb-5 lg:mx-0 lg:pt-0 lg:pb-0'>
          <h1 className='text-2xl font-normal md:text-lg'>
            {t('auth.register.formTermsTitle')}
          </h1>
          {!areStatementsLoading ? (
            statements.map((statement: Statement, index: number) =>
              statement.status === 'active' ? (
                <label key={index} className='text-gray'>
                  <Checkbox name={`customAgreement${index + 1}`}>
                    <span>
                      {statement?.description}
                      {statement?.required ? (
                        <em className='text-error'> *</em>
                      ) : null}
                    </span>
                  </Checkbox>
                </label>
              ) : null
            )
          ) : (
            <Skeleton count={3} />
          )}
          <SubmitButton
            label='createAccount'
            loading={isLoading}
            disabled={areStatementsLoading}
            variant={areStatementsLoading ? 'disabled' : 'primary'}
          />
          <FormMessage type='error' params={errors} prefix='user' />
        </div>
      </div>
    </div>
  );
};
