import React from 'react';

import {FirstSection} from '../../../../types/types';

const FirstSubsection: React.FC<{content: FirstSection}> = ({content}) => (
  <>
    <div className="mx-10 flex transform flex-col justify-center  text-white lg:min-h-[82vh]">
      <div className="mb-5 w-full pt-5 ">
        <h1 className="text-3xl font-bold lg:pl-[6%]"> {content.title}</h1>
        <div className="my-20 flex flex-col flex-wrap text-justify md:my-5 md:flex-row lg:mx-20 lg:my-20">
          <div className="  lg:text-2xl">{content.description}</div>
        </div>
      </div>
    </div>
  </>
);
export default FirstSubsection;
