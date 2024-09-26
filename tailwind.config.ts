import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-grey': '#1f2937',
        'custom-light-grey': '#374151',
        'custom-purple': '#500724',
        'custom-blue': '#5BD1D7',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
  },
  plugins: [require('daisyui')],
};
export default config;
