import * as Yup from 'yup';

export type ValidationSchemaType<Y extends Yup.AnySchema> = Yup.InferType<Y>;

export const validationSchema = {
  global: {
    string: Yup.string().required('required'),
    required: Yup.string().required('required'),
    boolean: Yup.boolean().required('required'),
    number: Yup.number().min(0.01, 'min').required('required'),
    array: Yup.object(),
  },
};
