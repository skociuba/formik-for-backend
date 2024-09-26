import React from 'react';

import {secondSectionContent} from '../constants';

import SecondSubsection from './subsections/SecondSubsection';

const Second: React.FC = () => (
  <section
    id="second"
    className="mb-5 min-h-[100vh] flex-col border-t-2 border-white pt-[10vh] md:pt-[25vh] lg:m-[5%] lg:pt-[12vh]">
    <SecondSubsection content={secondSectionContent} />
  </section>
);

export default Second;
