import React from 'react';

import {usePage} from './usePage';
import { Button } from '@/components/commons/Button';
import {Input} from '@/components/commons/Input';
import {Checkbox} from '@/components/commons/Checkbox';
import {Form} from '@/components/ui/Form';

const Component = ({...props}) => {
  const {form} = usePage({
    ...props,
  });
  return (
    <div>
      <Form {...{form, className: 'flex flex-col gap-4'}}>
        <Input name="title" />
        <Checkbox name="completed" />
        <Button variant='primary' type="submit">Submit</Button>
      </Form>
    </div>
  );
};
export default Component;
