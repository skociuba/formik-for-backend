'use client';

import {motion} from 'framer-motion';

// const variants = {
//   hidden: {opacity: 0, x: -200, y: 100},
//   enter: {opacity: 1, x: 0, y: 0},
//   exit: {opacity: 0, x: 0, y: -100},
// };

// const variants = {
//   hidden: {opacity: 0, x: -1000}, // start from left
//   enter: {opacity: 1, x: 0}, // enter from left to center
//   exit: {opacity: 0, x: 1000}, // exit to right
// };

export default function Template({children}: {children: React.ReactNode}) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      //variants={variants}
      transition={{type: 'linear'}}
      className="overflow-hidden">
      {children}
    </motion.div>
  );
}
