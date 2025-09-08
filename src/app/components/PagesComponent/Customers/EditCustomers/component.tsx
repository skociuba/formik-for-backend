import React from 'react';

import {Button} from '@/components/commons/Button';
import {Input} from '@/components/commons/Input';
import {Form} from '@/components/ui/Form';

import {usePage} from './usePage';

const Component = ({...props}) => {
  const {form} = usePage({
    ...props,
  });
  return (
    <div>
      <Form {...{form, className: 'flex flex-col gap-4'}}>
        <Input name="name" />
        <Input name="email" />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Component;
