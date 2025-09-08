import {API_ENDPOINTS, ApiKeysType} from './../hooks/api/apiEndpoints';

type fetchRequestProps = {
  route: ApiKeysType;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  getFile?: boolean;
  id?: string;
  params?: {[key: string]: string};
  values?: {
    [key: string]:
      | string
      | number
      | boolean
      | File
      | null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | {[key: string]: any}
      | {[key: string]: any}[];
  };
};

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

const API_BASE = 'http://127.0.0.1:8000';

const generateRequestUrl = ({
  route,
  method,
  values,
  id,
  params,
}: Without<fetchRequestProps, 'token'>) => {
  const activeParams = params ? Object.keys(params) : [];
  const activeId = id || (!activeParams.includes('id') ? values?.id : null);
  let url = `${API_BASE}${API_ENDPOINTS[route].endpoint}${
    activeId ? `/${activeId}` : ''
  }`;

  if (params || values?.params) {
    let allParams: {[key: string]: any} = {};

    if (params) {
      allParams = {...params};
    }

    if (values?.params && typeof values?.params === 'object') {
      allParams = {...allParams, ...values.params};
    }

    Object.entries(allParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }

  if (!values) {
    return url;
  }

  switch (method) {
    case 'GET':
      return Object.entries(values).reduce((prev, current) => {
        if (Array.isArray(current[1]) && current[1] !== null) {
          let updatedUrl = prev;
          current[1].forEach((item, index) => {
            Object.entries(item).forEach((children) => {
              updatedUrl =
                updatedUrl +
                `${updatedUrl.includes('?') ? '&' : '?'}${
                  current[0]
                }[${index}][${children[0]}]=${children[1]}`;
            });
          });
          return updatedUrl;
        } else {
          return current[1] === '' || !current[1] || current[0] === 'params'
            ? prev
            : prev +
                `${prev.includes('?') ? '&' : '?'}${current[0]}=${current[1]}`;
        }
      }, url);
    default:
      return url;
  }
};

const generateFormData = ({
  values,
  method,
}: Pick<fetchRequestProps, 'values' | 'method'>) => {
  const form = new FormData();

  form.append('_method', method);

  if (!values) {
    return form;
  }

  for (const [key, value] of Object.entries(values)) {
    if (value === '' || !value) {
      continue;
    }

    if (Array.isArray(value)) {
      value.map((item, index) => {
        if (
          typeof item === 'object' &&
          item !== null &&
          !(item instanceof File)
        ) {
          for (const [itemKey, itemValue] of Object.entries(item)) {
            form.append(
              `${key.replaceAll('_', '.')}[${index}][${itemKey}]`,
              null === itemValue
                ? ''
                : itemValue instanceof File
                  ? itemValue
                  : itemValue
                    ? itemValue.toString()
                    : '',
            );
          }
        } else {
          form.append(`${key.replaceAll('_', '.')}[]`, item);
        }
      });
    } else {
      form.append(
        key.replaceAll('_', '.'),
        null === value ? '' : value instanceof File ? value : value.toString(),
      );
    }
  }

  return form;
};

export const fetchRequest = async ({
  route,
  method,
  values,
  id,
  params,
  getFile,
}: fetchRequestProps) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        Accept: 'application/json',
      },
      body: method === 'GET' ? null : generateFormData({values, method}),
    };

    const url = generateRequestUrl({route, id, method, values, params});

    const res = await fetch(url, requestOptions);

    const {status} = await res;

    if (status !== 200) {
      const {message, data, errors} = await res.json();
      return {
        error:
          message || data.message || 'Something went wrong during fetching!',
        errors: errors || [],
        status,
      };
    } else if (getFile) {
      return {data: await res.blob(), status};
    } else {
      return await res.json();
    }
  } catch {
    return {error: 'Something went wrong during fetching!'};
  }
};
