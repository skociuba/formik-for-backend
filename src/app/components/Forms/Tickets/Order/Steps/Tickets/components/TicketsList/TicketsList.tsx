import Skeleton from 'react-loading-skeleton';

import { Button } from '@/components/commons/Button';
import {
  OrderTicketCard,
  TicketType,
} from '@/components/commons/Cards/OrderTicketCard';
import SearchInput from '@/components/commons/Form/Ui/SearchInput';

import { useTicketsList } from './useTicketsList';

export type TicketsListProps = {
  toggleTicket: (action: 'add' | 'remove', id: string) => void;
  countTicket: (id: string) => number;
  setType: () => void;
  id?: string;
  access?: string;
};

export const TicketsList = ({
  countTicket,
  toggleTicket,
  setType,
  ...props
}: TicketsListProps) => {
  const { tickets, t, isLoading, status, search, setSearch, isRefetching } =
    useTicketsList(props);

  return (
    <>
      <div className='flex justify-between'>
        <p className='text-2xl font-bold'>Wszystkie bilety</p>
        <Button
          variant='quaternary'
          className='h-8 p-0'
          handleClick={() => {
            setSearch('');
            setType();
          }}
        >
          <p className='hidden font-bold text-navy md:block'>
            Pokaż proponowane
          </p>
        </Button>
      </div>
      <div className='mt-6 mb-8'>
        <SearchInput
          name='search'
          placeholder='searchTicket'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={(e) => setSearch(e.target.value)}
          clearField={() => setSearch('')}
        />
      </div>
      <Button
        variant='secondary'
        fullWidth
        className='mb-5 -mt-3 md:hidden'
        handleClick={() => setSearch('')}
      >
        {t('showAll')}
      </Button>
      {isLoading || isRefetching || status !== 'success' || !tickets ? (
        <Skeleton {...{ count: 10, height: 50 }} />
      ) : (
        tickets.map((item: TicketType) => (
          <OrderTicketCard
            key={item.id}
            {...{
              ...item,
              name: item.ticket.name,
              count: countTicket(item.id),
              ticket_type: item.ticket.ticket_type,
              discounts: item.ticket.discount
                ? item.ticket.discount.map(({ value }: any) => value)
                : [],
              handleAdd: () => toggleTicket('add', item.id),
              handleRemove: () => toggleTicket('remove', item.id),
            }}
          />
        ))
      )}
    </>
  );
};
