
import * as Yup from 'yup';
import { validationSchema, ValidationSchemaType } from '@/lib/validation';
export const exampleValidationSchema = Yup.object({
//   userId: validationSchema.global.number,
//  id: validationSchema.global.number,
  title: validationSchema.global.string,
  completed: validationSchema.global.boolean,
});

export const initialValues: ValidationSchemaType<
  typeof exampleValidationSchema
> = {
  // userId: 1,
  // id: 1,
  title: '',
  completed: false,
};
