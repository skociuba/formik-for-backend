import useTranslation from 'next-translate/useTranslation';

import {TicketType} from '@/components/commons/Cards/OrderTicketCard';
import DatepickerInput, {
  DatePickerInputProps,
} from '@/components/commons/Form/Ui/DatepickerInput';

type TicketProps = {
  expire_date: string;
  max_date?: Date;
  excludes?: {start: Date; end: Date}[];
} & TicketType &
  Pick<DatePickerInputProps, 'handleChange'>;

export const Ticket = ({
  name,
  activation_date,
  expire_date,
  max_date,
  excludes,
  handleChange,
}: TicketProps) => {
  const {t} = useTranslation('common');

  return (
    <div className="mt-10">
      <p className="font-bold">{name}</p>
      <div className="block md:flex md:flex-col">
        <div className="md:min-w-xs mt-5 flex min-w-full flex-col md:flex-row">
          <p className="mr-20">{t('choseActivationDate')}</p>
          <p className="hidden md:block">{t('ticketExpDate')}:</p>
        </div>
        <div className="mt-2 flex flex-col md:flex-row">
          <div className="text-gray md:min-w-xs mr-0 min-w-full md:mr-8">
            <DatepickerInput
              maxDate={max_date}
              excludes={excludes}
              handleChange={handleChange}
              value={activation_date}
              showTimeInput={true}
            />
          </div>
          <div className="rounded-xs bg-cloud md:min-w-xs mt-5 min-w-full py-5 text-center md:mt-0 md:rounded-none md:py-0 md:text-start">
            <p className="text-sm md:hidden">
              {t('pages.tickets.expirationTo')}
            </p>
            <p className="py-3 pl-0 font-bold md:pl-20">{expire_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
