import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import { useEffect } from 'react';

import { convertDate, generateTime, getDateData } from '@/lib/helpers';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';

export const useConfigurator = () => {
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();

  const updateTicket = (
    itemIndex: number,
    value: Date | [Date | null, Date | null] | null,
    type: string
  ) => {
    if (!(value instanceof Date)) {
      return;
    }

    return setFieldValue('item', [
      ...values.item.map((item: TicketType, index: number) =>
        itemIndex === index
          ? { ...item, activation_date: setActivationDate(value, type) }
          : item
      ),
    ]);
  };

  const setActivationDate = (value: Date, type: string) => {
    if (type === 'monthly') {
      const { date } = getDateData(value);
      return `01-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getFullYear()} 00:00`;
    }

    return convertDate(value, true);
  };

  const getMaxDate = (max_months: string) => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + Number(max_months));
    maxDate.setHours(23);
    maxDate.setMinutes(59);

    return maxDate;
  };

  const getExludeDates = (max_months: string, max_days: string) => {
    let excludes: { start: Date; end: Date }[] = [];
    for (let i = 0; i <= Number(max_months); i++) {
      const startDate = new Date();
      startDate.setDate(Number(max_days));
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i + 1,
        0
      );

      startDate.setMonth(startDate.getMonth() + i);

      if (endDate.getDate() > Number(max_days)) {
        excludes = [...excludes, { start: startDate, end: endDate }];
      }
    }

    return excludes;
  };

  const getExpirationDate = (
    activation_date: string,
    validity: number,
    type: string,
    max_days: string
  ) => {
    if (activation_date === '') {
      return '';
    }

    const additionalTime = generateTime(type, validity);

    if (type === 'monthly') {
      const { day: activation_day, date } = getDateData(activation_date);
      if (activation_day > Number(max_days)) {
        date.setMonth(date.getMonth() + 1);
      }
      const firstDayOfNextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = firstDayOfNextMonth.getDate();
      const hours = 23;
      const minutes = 59;

      return `${day.toString().padStart(2, '0')}-${month
        .toString()
        .padStart(2, '0')}-${year} ${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      const { year, month, day, hours, minutes } = getDateData(
        activation_date,
        {
          ...additionalTime,
        }
      );

      return `${day.toString().padStart(2, '0')}-${month
        .toString()
        .padStart(2, '0')}-${year} ${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  };

  const getActiveDate = (activation_date: string, max_days: string) => {
    const { day, date } = getDateData(activation_date);

    if (day > Number(max_days)) {
      date.setMonth(date.getMonth() + 1);
      return `01-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getFullYear()} 00:00`;
    }

    return activation_date;
  };

  useEffect(() => {
    setFieldValue('item', [
      ...values.item.map((item: any) => ({
        ...item,
        activation_date: getActiveDate(
          item.activation_date,
          item.ticket.first_days
        ),
      })),
    ]);
  }, []);

  return {
    values,
    updateTicket,
    getExpirationDate,
    getMaxDate,
    getExludeDates,
    getActiveDate,
  };
};
