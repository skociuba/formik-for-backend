export type ApiEndpointsType = {
  endpoint: string;
  method: ('GET' | 'POST' | 'PUT' | 'DELETE')[];
};

export type ApiKeysType = 'TODOS' | 'TODO' | 'TODO_UPDATE' | 'TODO_ADD' | 'CUSTOMERS' | 'CUSTOMERS_ADD' | "CUSTOMER" |"CUSTOMERS_EDIT"| "CUSTOMER_REMOVE";

export const API_ENDPOINTS: {[key in ApiKeysType]: ApiEndpointsType} = {
  TODOS: {
    endpoint: `/posts`,
    method: ['GET'],
  },

  TODO: {
    endpoint: `/todos/{id}`,
    method: ['GET'],
  },
  TODO_UPDATE: {
    endpoint: `/todos/{id}`,
    method: ['PUT', 'DELETE'],
  },
  TODO_ADD: {
    endpoint: `/posts`,
    method: ['POST'],
  },
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
