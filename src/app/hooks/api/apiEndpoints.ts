export type ApiEndpointsType = {
  endpoint: string;
  method: ('GET' | 'POST' | 'PUT' | 'DELETE')[];
};

export type ApiKeysType = 'TODOS' | 'TODO' | 'TODO_UPDATE' | 'TODO_ADD' | 'CUSTOMERS' | 'CUSTOMERS_ADD';

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
    endpoint: `/customers`,
    method: ['GET'],
  },
  CUSTOMERS_ADD: {
    endpoint: `/customers`,
    method: ['POST'],
  },
};
