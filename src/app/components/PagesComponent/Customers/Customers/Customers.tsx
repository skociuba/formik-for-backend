import React, {useState, useEffect} from 'react';

import {useApiMutation} from '@/hooks/api/useApiMutation';
import {Button} from '@/components/commons/Button';

import {usePage} from './usePage';
const Customers = () => {
  const [id, setId] = useState('');
  const {data, isLoading, error, router, refetch} = usePage();

  const {mutate} = useApiMutation({
    route: 'CUSTOMER_REMOVE',
    method: 'DELETE',
    params: {
      id: id,
    },
  });
  useEffect(() => {
    if (id) {
      mutate({id: id});
    }
  }, [id]);
  useEffect(() => {
    refetch();
  }, [id]);

  const handleEditClick = (id: string) => () => {
    router?.push(`/customers/edit/${id}`);
  };
  const handleAdd = () => () => {
    router?.push(`/customers/add`);
  };

  const handleRemove = (id: string) => () => {
    setId(id);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div className="ml-8 mt-24 min-h-screen">
      <Button handleClick={handleAdd()} className="mb-3">Hello
      </Button>

      {data?.length && (
        <div>
          {data.map(
            ({name, email, id}: {name: string; email: string; id: string}) => (
              <div key={id} className="flex flex-row p-8">
                <p className="w-2/3 font-bold">{name}</p>
                <p className="w-2/3">{email}</p>
                <Button handleClick={handleEditClick(id)}>Edit</Button>
                <Button handleClick={handleRemove(id)}>Remove</Button>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Customers;
