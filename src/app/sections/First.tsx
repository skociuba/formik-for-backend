import React from 'react';

import {firstSectionContent} from '../constants';

import FirstSubsection from './subsections/FirstSubsection';

const First: React.FC = () => (
  <section
    id="first"
    className="mb-5 min-h-[100vh] flex-col border-t-2 border-white pt-[10vh] md:pt-[25vh] lg:m-[5%] lg:pt-[12vh]">
    <FirstSubsection content={firstSectionContent} />
  </section>
);

export default First;
