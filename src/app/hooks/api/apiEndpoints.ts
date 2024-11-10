export type ApiEndpointsType = {
  endpoint: string;
  method: ('GET' | 'POST' | 'PUT' | 'DELETE')[];
};

export type ApiKeysType =  'CUSTOMERS' | 'CUSTOMERS_ADD' | "CUSTOMER" |"CUSTOMERS_EDIT"| "CUSTOMER_REMOVE";

export const API_ENDPOINTS: {[key in ApiKeysType]: ApiEndpointsType} = {

  CUSTOMERS:{
    endpoint: `/api/customers`,
    method: ['GET'],
  },
  CUSTOMER:{
    endpoint: `/api/customers/{id}`,
    method: ['GET'],
  },
  CUSTOMERS_ADD: {
    endpoint: `/api/customers`,
    method: ['POST'],
  },
  CUSTOMERS_EDIT: {
    endpoint: `/api/customers/{id}`,
    method: ['PUT'],
  },
  CUSTOMER_REMOVE: {
    endpoint: `/api/customers/{id}`,
    method: ['DELETE'],
  },
};
