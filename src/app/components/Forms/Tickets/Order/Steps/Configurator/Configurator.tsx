import useTranslation from 'next-translate/useTranslation';

import {Ticket} from './components/Ticket';
import {useConfigurator} from './useConfigurator';

import {TicketType} from '@/components/commons/Cards/OrderTicketCard';

export const Configurator = () => {
  const {t} = useTranslation('common');
  const {
    values,
    updateTicket,
    getExpirationDate,
    getMaxDate,
    getExludeDates,
    getActiveDate,
  } = useConfigurator();

  return (
    <div className="pb-52 md:pb-0">
      <p className="hidden text-2xl font-bold md:block">
        {t('choseTicketActivationDate')}
      </p>
      <p className="text-gray pt-3">{t('purchasedTicketsDateInfo')}</p>
      {values.item.map((item: TicketType, index: number) => (
        <Ticket
          key={`${item.id}-${index}`}
          {...{
            ...item,
            activation_date: getActiveDate(
              item.activation_date,
              item.ticket.first_days,
            ),
            max_date:
              item.ticket.ticket_type === 'monthly'
                ? getMaxDate(item.ticket.months_before)
                : undefined,
            excludes:
              item.ticket.ticket_type === 'monthly'
                ? getExludeDates(
                    item.ticket.months_before,
                    item.ticket.first_days,
                  )
                : undefined,
            expire_date: getExpirationDate(
              item.activation_date,
              item.validity,
              item.ticket.ticket_type,
              item.ticket.first_days,
            ),
            handleChange: (dates) =>
              updateTicket(index, dates, item.ticket.ticket_type),
          }}
        />
      ))}
    </div>
  );
};
