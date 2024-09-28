import * as Yup from 'yup';
import { validationSchema, ValidationSchemaType } from '@/lib/validation';
export const exampleValidationSchema = Yup.object({
 name: validationSchema.global.string,
  email: validationSchema.global.string,
});

export const initialValues: ValidationSchemaType<
  typeof exampleValidationSchema
> = {

  name: '',
  email: "",
};
