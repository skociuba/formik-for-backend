import dynamic from 'next/dynamic';

import { clsxm } from '@/lib/clsxm';


import { Container } from '@/components/commons/Container';


import { IntroProps } from './components/Intro';

export type LayoutProps = {
  children?: React.ReactElement;
} &
  IntroProps;



const Intro = dynamic(() => import('./components/Intro').then((m) => m.Intro), {
  ssr: false,
});



export const Layout = ({children, ...props }: LayoutProps) => {


  return (
    <>
      <div className='flex flex-col gap-9 pt-32 pb-24'>
        <Container className={clsxm('flex flex-col md:gap-9')}>
          <div className='text-primary flex flex-col gap-7 pb-8 md:pb-0'>
            <Intro {...props} />
          </div>
          {children}
        </Container>
      </div>
    </>
  );
};
