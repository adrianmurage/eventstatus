module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      dropShadow: {
        sm: ['0 1px 3px hsla(0 0% 0% /.12)', '0 1px 2px hsla(0 0% 0% /.24)'],
        md: ['0 3px 6px hsla(0 0% 0% /.15)', '0 2px 4px hsla(0 0% 0% /.12)'],
        lg: [
          '0 10px 20px hsl(0 0% 0%/ .15%)',
          '0 3px 6px rgba(0 0% 0% / 0.15)',
        ],
        orange: ['0 1px 3px hsla(24.581 95% 53% / 1)'],
      },
      colors: {
        gray: {
          100: '#FBFBFB',
          200: '#EAEAEA',
          300: '#DFDFDF',
          400: '#999999',
          500: '#7F7F7F',
          600: '#666666',
          700: '#4C4C4C',
          800: '#333333',
          900: '#191919',
        },
        orange: '#f97316',
        blue: '#3b82f6',
        black: '#1f2937',
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#f97316',
          secondary: '#1f2937',
          accent: '#1dcdbc',
          neutral: '#2b3440',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
