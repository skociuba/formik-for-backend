import {useRouter} from 'next/navigation';

import Component from './component';

import {useApiQuery} from '@/hooks/api/useApiQuery';
function TodosComponent({id}: {id: string}) {
  const {data, isLoading, error} = useApiQuery({
    route: 'CUSTOMER',
    params: {
      id: id,
    },
  });
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/customers');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div className="mt-24 min-h-screen">
      {data && <div>{data.title}</div>}
      <div>
        {data && !isLoading ? (
          <Component
            {...{
              handleSubmit,
              id,
              oldValues: {
                ...data,
              },
            }}
          />
        ) : null}
      </div>
      <div className="flex justify-center text-white" />
    </div>
  );
}

export default TodosComponent;
