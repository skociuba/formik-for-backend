import useTranslation from 'next-translate/useTranslation';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';
import { Icon } from '@/components/commons/Icon/Icon';

type TicketProps = {
  count: number;
  handleRemove: () => void;
} & TicketType;

export const Ticket = ({ ticket, count, price, handleRemove }: TicketProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='hidden md:flex'>
      <button type='button' className='mr-2' onClick={() => handleRemove()}>
        <Icon name='closeticket' />
      </button>
      <div className='flex w-full min-w-xs justify-between pr-9 md:pr-0'>
        <p className='max-w-[70%]'>
          {ticket?.name || ''} x {count}
        </p>
        <p>
          {price * count} {t('currencyLabel')}
        </p>
      </div>
    </div>
  );
};
