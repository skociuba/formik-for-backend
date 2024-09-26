import Skeleton from 'react-loading-skeleton';

import { Button } from '@/components/commons/Button';
import { OrderTicketCard } from '@/components/commons/Cards/OrderTicketCard';
import SearchInput from '@/components/commons/Form/Ui/SearchInput';

import { useProposedTicketsList } from './useProposedTicketsList';

export type ProposedTicketsListProps = {
  toggleTicket: (action: 'add' | 'remove', id: string) => void;
  countTicket: (id: string) => number;
  setType: () => void;
  tickets: any[];
  isLoading: boolean;
  status: string;
  maxTickets: number;
};

export const ProposedTicketsList = ({
  countTicket,
  toggleTicket,
  setType,
  tickets,
  isLoading,
  status,
  maxTickets,
}: ProposedTicketsListProps) => {
  const { t, search, setSearch, items } = useProposedTicketsList({ tickets });

  return (
    <>
      <div className='flex justify-between'>
        <p className='text-2xl font-bold'>{t('proposedTickets')}</p>
        <Button
          variant='quaternary'
          className='h-8 p-0'
          handleClick={() => {
            setSearch('');
            setType();
          }}
        >
          <p className='hidden font-bold text-navy md:block'>{t('showAll')}</p>
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
      {isLoading || status !== 'success' || !items ? (
        <Skeleton {...{ count: 10, height: 50 }} />
      ) : (
        items.map((item: any) => (
          <OrderTicketCard
            key={item.id}
            {...{
              ...item,
              maxTickets,
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
