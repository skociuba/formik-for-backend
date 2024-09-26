import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

type UseTicketsListProps = {
  id?: string;
  access?: string;
};

export const useTicketsList = ({ id, access }: UseTicketsListProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [search, setSearch] = useState<string>('');
  const { data, refetch, ...apiQuery } = useApiQuery({
    route: access === 'admin' ? 'POK_TICKET_LIST' : 'TICKET_LIST',
    params: { id: typeof router.query.id === 'string' ? router.query.id : '' },
    values: { search },
  });

  const tickets = data ? data : [];

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    tickets,
    t,
    search,
    setSearch,
    ...apiQuery,
  };
};
