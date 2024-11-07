import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4FAAFF',
        OnPrimary: '#FFFFFF',
        OnBackground: '#000000',
        OnBackgroundGray: '#A5A5A5',
        Error: '#FF4444',
        background: '#FFFFFF',
        OnSubcolor1: '#4378FF',
        OnSubcolor2: '#54A900',
        SubColor4: '#99CEFF',
        OnSurface: '#878787',
        Surface: '#EEF4FC',
        Outline: '#D9D9D9',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
