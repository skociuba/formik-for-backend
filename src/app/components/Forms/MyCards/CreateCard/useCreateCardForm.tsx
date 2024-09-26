import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { CreateCardFormProps } from './CreateCardForm';
import {
  createCardValidationSchema,
  duplicateCardValidationSchema,
  initialValues,
} from './CreateCardFormModel';

export const useCreateCardForm = ({
  handleClose,
  handleSubmit,
  oldValues,
  mifare,
  isDuplicate,
  ...props
}: CreateCardFormProps) => {
  const { mutate, isLoading, errors } = useApiMutation(props);

  const form = useForm({
    initialValues: { ...initialValues, ...oldValues },
    validationSchema: isDuplicate
      ? duplicateCardValidationSchema
      : createCardValidationSchema,
    onSubmit: async (values) => {
      let newNumber = values.number;
      if (values.type === 'city_card') {
        newNumber = values.number.replace(/\D/g, '').substring(1);
      }
      mutate(
        { ...values, number: newNumber },
        {
          onSuccess: ({ error }) => {
            if (!error) {
              handleSubmit();
              handleClose();
            }
          },
        }
      );
    },
  });

  const getCardNumber = () => {
    if (!mifare) {
      return;
    }

    const socket = io('https://ps.centreoservice.com', { reconnection: true });

    socket.on('connect', () => {
      console.log('Connected!');
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        console.log('Reconnecting!');
        socket.connect();
      }
    });

    socket.emit('joinRoom', mifare.pokID, mifare.roomID, (data: any) => {
      console.log(data);
    });

    socket.on('token', (data) => {
      console.log(data);
      if (data.length === 64) {
        form.setFieldValue('type', 'emv_card');
        form.setFieldValue('token', data);
      } else {
        form.setFieldValue('type', 'city_card');
        form.setFieldValue('number', parseInt(data, 16).toString());
      }
    });
  };

  useEffect(() => {
    if (mifare) {
      getCardNumber();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return { form, errors, isLoading };
};
