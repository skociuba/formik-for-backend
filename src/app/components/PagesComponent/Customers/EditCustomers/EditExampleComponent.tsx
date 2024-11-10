import {useRouter} from 'next/navigation';

import Component from './component';


function TodosComponent({id, oldValues}: {id: string,oldValues: any}) {

  const router = useRouter();
  const handleSubmit = () => {
    router.push('/customers');
  };



  return (
    <div className="mt-24 min-h-screen">

      <div>
      
          <Component
            {...{
              handleSubmit,
              id,
              oldValues,
          
            }}
          />
        
      </div>
      <div className="flex justify-center text-white" />
    </div>
  );
}

export default TodosComponent;
