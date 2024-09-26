'use client';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/Layouts/Example/Layout';
const AddExampleComponent = dynamic(
  () =>
    import(
      '@/components/PageComponents/AddExampleComponent/AddExampleComponent'
    ).then((m) => m.default),
  {
    ssr: false,
  },
);
const AddExamplePage = () =>{ return (
  <Layout
    {...{
      title: 'Add',
      breakpoints: [
        { children: 'main', href: '/' },
        { children: 'example', href: '/example' },
      ],
      hideOnMobile: { title: true, subTitle: true },
    }}
  >
    <AddExampleComponent />
  </Layout>
);
};
export default AddExamplePage;
