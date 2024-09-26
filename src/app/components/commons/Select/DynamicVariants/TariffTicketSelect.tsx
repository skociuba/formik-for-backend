import { useFormikContext } from 'formik';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import {
  Select,
  SelectProps,
} from '@/components/commons/Form/Fields/Select/Select';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

type TariffTicket = {
  id: string;
  name: string;
  ticket_type?: 'daily' | 'monthly';
};

type TariffTicketSelectProps = {
  index: number;
};

export const TariffTicketSelect = ({
  index,
  ...props
}: TariffTicketSelectProps & Without<SelectProps, 'options'>) => {
  const { setFieldValue } = useFormikContext();
  const { data, status } = useApiQuery({
    route: 'ADMIN_TICKET_LIST',
  });

  const clearValues = () => {
    [
      'dateStart',
      'dateEnd',
      'inSaleFrom',
      'inSaleTo',
      'displayedFrom',
      'displayedTo',
      'canStartFrom',
      'canStartTo',
    ].forEach((item) => {
      setFieldValue(`ticket[${index}].${item}`, '');
    });

    setFieldValue(`ticket[${index}].from_any_day`, '0');
    setFieldValue(`ticket[${index}].priceNetto`, 0);
    setFieldValue(`ticket[${index}].priceNettoGross`, 0);
  };

  const setTicketType = (ticketId: string) => {
    const ticketType =
      data?.find((obj: TariffTicket) => obj.id === ticketId)?.ticket_type ||
      'daily';
    if (!ticketType) return;
    setFieldValue(`ticket[${index}].ticket_type`, ticketType);
  };

  const handleChange = (ticketId: string) => {
    clearValues();
    setTicketType(ticketId);
    setFieldValue(props.name, ticketId);
  };

  return status === 'success' && data ? (
    <Select
      {...{
        ...props,
        dynamic: true,
        options: [
          ...data.map(({ id, name }: TariffTicket) => ({
            name,
            value: id,
          })),
        ],
        handleChange,
      }}
    />
  ) : (
    <Skeleton height={48} width={200} />
  );
};
