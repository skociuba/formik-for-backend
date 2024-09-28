'use client';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/Layouts/Example/Layout';
const Example = dynamic(
  () =>
    import(
      '@/components/PagesComponent/Customers/EditCustomers/EditExampleComponent'
    ).then((m) => m.default),
  {
    ssr: false,
  },
);
const ExamplePage = ({params: {id}}: {params: {id: string}}) => { return (
  <Layout
    {...{
      title: 'Edit',
      breakpoints: [
        { children: 'main', href: '/' },
        { children: 'customers', href: '/customers' },
      ],
      hideOnMobile: { title: true, subTitle: true },
    }}
  >
    <Example id={id} />
  </Layout>
);
};

export default ExamplePage;