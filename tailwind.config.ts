import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'accent-background': 'hsl(240 4.8% 95.9%)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        danger: '#BE1F2A'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      }
    }
  },
  plugins: []
};
export default config;
