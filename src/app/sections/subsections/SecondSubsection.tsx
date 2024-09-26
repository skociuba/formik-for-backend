import React from 'react';
import Image from 'next/image';

import {SecondSection} from '../../../../types/types';

import Check from './../../../../public/icons/check-square.svg';

const SecondSubsection: React.FC<{content: SecondSection}> = ({content}) => (
  <div className="mx-10 flex transform flex-col justify-center  text-white lg:min-h-[82vh]">
    <div className="mb-5 w-full pt-5 ">
      <h1 className="text-3xl font-bold lg:pl-[6%]">{content.title}</h1>
      <div className="m-5 flex flex-col flex-wrap md:flex-row lg:m-12 lg:text-2xl">
        <div className="p-2 lg:p-10 ">
          {content.description.map((item) => (
            <div key={item} className="mb-5 flex items-center ">
              <Image src={Check} alt="Profile" width={20} height={20} />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default SecondSubsection;
