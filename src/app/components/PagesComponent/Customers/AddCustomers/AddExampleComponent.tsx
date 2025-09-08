import React from 'react';
import {useRouter} from 'next/navigation';

import Component from './component';

const TodosComponent = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/customers');
  };

  return (
    <div className="mt-24 min-h-screen">
      <Component
        {...{
          handleSubmit,
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TodosComponent;
