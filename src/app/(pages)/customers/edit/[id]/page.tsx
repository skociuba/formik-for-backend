'use client';
import dynamic from 'next/dynamic';
import React, {useEffect} from 'react';

import {useApiQuery} from '@/hooks/api/useApiQuery';
import {Layout} from '@/components/Layouts/Example/Layout';
const Example = dynamic(
  () =>
    import(
      '@/components/PagesComponent/Customers/EditCustomers/EditExampleComponent'
    ).then((m) => m.default),
  {
    ssr: false,
  },
);
const ExamplePage = ({params: {id}}: {params: {id: string}}) => {
  const {data, isLoading, refetch, isRefetching} = useApiQuery({
    route: 'CUSTOMER',
    params: {
      id: id,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout
      {...{
        title: 'Edit',
        breakpoints: [
          {children: 'main', href: '/'},
          {children: 'customers', href: '/customers'},
        ],
        hideOnMobile: {title: true, subTitle: true},
      }}>
      {data && !isLoading && !isRefetching ? (
        <Example oldValues={data} id={id} />
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default ExamplePage;
