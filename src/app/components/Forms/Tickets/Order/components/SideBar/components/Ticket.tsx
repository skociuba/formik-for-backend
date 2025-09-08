import useTranslation from 'next-translate/useTranslation';

import {Icon} from '@/components/commons/Icon/Icon';

import {TicketType} from '@/components/commons/Cards/OrderTicketCard';

type TicketProps = {
  count: number;
  handleRemove: () => void;
} & TicketType;

export const Ticket = ({ticket, count, price, handleRemove}: TicketProps) => {
  const {t} = useTranslation('common');

  return (
    <div className="hidden md:flex">
      <button type="button" className="mr-2" onClick={() => handleRemove()}>
        <Icon name="closeticket" />
      </button>
      <div className="min-w-xs flex w-full justify-between pr-9 md:pr-0">
        <p className="max-w-[70%]">
          {ticket?.name || ''} x {count}
        </p>
        <p>
          {price * count} {t('currencyLabel')}
        </p>
      </div>
    </div>
  );
};
