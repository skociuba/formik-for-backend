import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { convertDate } from '@/lib/helpers';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';

import { TicketsProps } from './Tickets';

export const useTickets = (props: TicketsProps) => {
  const router = useRouter();
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();
  const { data, ...apiQuery } = useApiQuery(props);
  const [search, setSearch] = useState<string>('');
  const [type, setType] = useState<'proposed' | 'all'>('proposed');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [maxTickets, setMaxTickets] = useState<number>(0);
  const { data: all } = useApiQuery({
    route: props.access === 'admin' ? 'POK_TICKET_LIST' : 'TICKET_LIST',
    params: { id: typeof router.query.id === 'string' ? router.query.id : '' },
  });
  const [globalTicketCount, setGlobalTicketCount] = useState<number>(0);

  const toggleTicket = (action: 'add' | 'remove', id: string) => {
    const currentCount = values.item.length;

    if (action === 'remove') {
      const indexToRemove = values.item.findIndex(
        (ticket: any) => ticket.id === id
      );

      const ticketsToRemove = values.item.filter(
        (ticket: any) => ticket.id === id
      );

      if (indexToRemove !== -1) {
        setFieldValue('item', [
          ...values.item.slice(0, indexToRemove),
          ...values.item.slice(indexToRemove + 1),
        ]);
        setGlobalTicketCount((prevCount) => prevCount - 1);
      }

      setFieldValue('item', [
        ...values.item.filter((ticket: any) => ticket.id !== id),
        ...ticketsToRemove.filter(
          (_ticket: any, index: number) => index !== ticketsToRemove.length - 1
        ),
      ]);
    } else {
      if (globalTicketCount < maxTickets) {
        const allTickets = data?.tickets ? [...data.tickets, ...all] : all;
        const ticketToAdd = allTickets.find((item: any) => item.id === id);
        setGlobalTicketCount(currentCount + 1);
        setFieldValue('item', [
          ...values.item,
          {
            ...ticketToAdd,
            name: ticketToAdd.ticket.name,
            price: Number(ticketToAdd.price),
            validity: ticketToAdd.ticket.time_unit_value
              ? Number(ticketToAdd.ticket.time_unit_value)
              : 0,
            activation_date: convertDate('', true),
          },
        ]);
      }
    }
  };

  if (!maxTickets && data?.max_tickets) {
    setMaxTickets(data?.max_tickets);
  }

  const countTicket = (id: string): number =>
    values.item.filter((ticket: TicketType) => ticket.id === id).length;

  useEffect(() => {
    setGlobalTicketCount(values.item.length);
  }, [values.item]);

  useEffect(() => {
    if (search === '' && data?.tickets) {
      return setTickets(data?.tickets);
    }

    const filteredTickets = data?.tickets
      ? data?.tickets?.filter(({ name }: TicketType) => name.includes(search))
      : [];
    return setTickets(filteredTickets);
  }, [data, search]);

  return {
    search,
    setSearch,
    tickets,
    toggleTicket,
    countTicket,
    maxTickets,
    type,
    setType,
    ...apiQuery,
  };
};
