import { useRouter } from 'next/router';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import {
  Select,
  SelectProps,
} from '@/components/commons/Form/Fields/Select/Select';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

export const DiscountSelect = ({
  type,
  ...props
}: { type?: string; access?: 'client' | 'admin' } & Without<
  SelectProps,
  'options'
>) => {
  const { query } = useRouter();
  const { data, status } = useApiQuery({
    route: 'ADMIN_DISCOUNTS',
    values: { type: type || '' },
    params: { id: typeof query.id === 'string' ? query.id : '' },
  });

  return (
    <>
      {status === 'success' && data ? (
        <Select
          {...{
            ...props,
            dynamic: true,
            options: [
              ...data.items.map((discount: any) => ({
                name: discount.name,
                value: discount.id,
              })),
            ],
          }}
        />
      ) : (
        <Skeleton height={48} width={200} />
      )}
    </>
  );
};
