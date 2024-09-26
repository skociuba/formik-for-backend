import React from 'react';

import {usePage} from './usePage';
import {Button} from '@/components/commons/Button';
function TodosComponent() {
  const {data, isLoading, error, router} = usePage();

  const handleEditClick = (id:string) => () => {
    router?.push(`/example/edit/${id}`);
  };
  const handleAdd = () => () => {
    router?.push(`/example/add`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div className="ml-8 mt-24 min-h-screen">
      <Button handleClick={handleAdd()} className='mb-3'>Add</Button>

      {data && (
        <div>
          {data.map(({title,body, id}:{title:string, body:string, id:string}) => (
            <div key={id} className="flex flex-row p-8">
              <p className="w-2/3 font-bold">{title}</p >
              <p className="w-2/3">{body}</p >
              <Button handleClick={handleEditClick(id)}>Edit</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodosComponent;
