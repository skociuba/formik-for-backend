import {UseApiQueryProps} from '@/hooks/api/useApiQuery';
import {FormProps} from '@/components/Forms/@types/Form';

import {ProposedTicketsList} from './components/ProposedTicketsList/ProposedTicketsList';
import {TicketsList} from './components/TicketsList/TicketsList';
import {useTickets} from './useTickets';

import {CardSelect} from '@/components/commons/Form/Fields/Select/DynamicVariants/CardSelect';

export type TicketsProps = Pick<FormProps, 'access'> & UseApiQueryProps;

export const Tickets = ({access, ...props}: TicketsProps) => {
  const {
    toggleTicket,
    countTicket,
    type,
    setType,
    isLoading,
    status,
    tickets,
    maxTickets,
  } = useTickets({...{...props, access}});

  return (
    <div className="pb-[50px] md:pb-0">
      <div className="mb-8 mt-2">
        <CardSelect
          name="card"
          label="choiceCard"
          placeholder="card"
          isClear={true}
          clearLabel="empty"
          access={access}
        />
      </div>
      {type === 'proposed' ? (
        <ProposedTicketsList
          {...{
            countTicket,
            toggleTicket,
            isLoading,
            status,
            tickets,
            maxTickets,
            setType: () => setType('all'),
          }}
        />
      ) : (
        <TicketsList
          {...{
            setType: () => setType('proposed'),
            countTicket,
            toggleTicket,
            access,
            id: props.id,
          }}
        />
      )}
    </div>
  );
};
