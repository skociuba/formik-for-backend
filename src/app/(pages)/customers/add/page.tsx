'use client';
import dynamic from 'next/dynamic';

import {Layout} from '@/components/Layouts/Example/Layout';
const AddExampleComponent = dynamic(
  () =>
    import(
      '@/components/PagesComponent/Customers/AddCustomers/AddExampleComponent'
    ).then((m) => m.default),
  {
    ssr: false,
  },
);
const AddExamplePage = () => (
  <Layout
    {...{
      title: 'Add',
      breakpoints: [
        {children: 'main', href: '/'},
        {children: 'customers', href: '/customers'},
      ],
      hideOnMobile: {title: true, subTitle: true},
    }}>
    <AddExampleComponent />
  </Layout>
);
export default AddExamplePage;
