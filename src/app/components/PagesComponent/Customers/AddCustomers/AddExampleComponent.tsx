import React from 'react';
import {useRouter} from 'next/navigation';

import Component from './component';

const TodosComponent =() => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/example');
  };

  return (
    <div className="mt-24 min-h-screen">
      <Component
        {...{
          handleSubmit,
        }}
      />
         </div>
      );

}

export default TodosComponent;
