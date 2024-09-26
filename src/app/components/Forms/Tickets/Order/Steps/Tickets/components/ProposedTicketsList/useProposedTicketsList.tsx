import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

export type UseProposedTicketsList = {
  tickets: any[];
};

export const useProposedTicketsList = ({ tickets }: UseProposedTicketsList) => {
  const { t } = useTranslation('common');
  const [items, setItems] = useState<any[]>(tickets);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (search === '' && tickets) {
      return setItems(tickets);
    }

    const filteredTickets = tickets
      ? tickets?.filter(({ ticket: { name } }: any) => name.includes(search))
      : [];
    return setItems(filteredTickets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, search]);

  return {
    t,
    items,
    search,
    setSearch,
  };
};
