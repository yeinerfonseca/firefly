/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      heading: ['Massilia', 'helvetica', 'sans-serif'],
      body: ['Mundial', 'helvetica', 'sans-serif'],
    },
    fontWeight: {
      ultra: 800,
      bold: 700,
      demibold: 700,
      regular: 400,
      light: 300,
    },
    colors: {
      blur: 'rgba(#6F4DF3, .85)',
      overlay: {
        plume: 'rgba(#26122F, .7)',
        'russian-violet': 'rgba(#2C0F48, .55)',
        black: 'rgba(#20202A, .45)',
        white: 'rgba(#FFFFFF, .3)',
        purple: 'rgba(#6F4DF3, .15)',
      },
      bg: {
        l1: '#190B28',
        l2: '#DBFF72',
        l3: '#6F4DF3',
        l4: '#B9AAFA',
        l5: '#BCE6EC',
        'dark-purple': '#553DAD',
        yellow: {
          deep: '#1F220F',
          light: '#6D7558',
        },
      },
      divider: {
        white: 'rgba(255, 255, 255, .45)',
        lilac: '#B9AAFA',
        plumec: 'rgba(#26122F, .25)',
      },
      semantic: {
        green: '#7DDB8B',
        orange: '#FFB267',
        violet: '#B688FF',
        red: '#FF9998',
        ruby: '#FF99FF',
        'sky-blue': '#99CDFF',
        'slate-blue': '#9999FF',
        'yellow-sun': '#FEE36D',
        'green-blue': '#C9E7DF',
      },
    },
    screens: {
      md: '768px',
      lg: '1440px',
    },
  },
  plugins: [],
}
