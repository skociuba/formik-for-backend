'use client';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/Layouts/Example/Layout';
const Example = dynamic(
  () =>
    import(
      '@/components/PagesComponent/Customers/Customers/Customers'
    ).then((m) => m.default),
  {
    ssr: false,
  },
);
const ExamplePage = () =>{ return (
  <Layout
    {...{
      title: 'Example',
      breakpoints: [
        { children: 'main', href: '/' },
      ],
      hideOnMobile: { title: true, subTitle: true },
    }}
  >
    <Example />
  </Layout>
);
};

export default ExamplePage;
