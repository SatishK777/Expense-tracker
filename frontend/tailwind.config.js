/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b4c6fc',
          400: '#8da2fb',
          500: '#6875f5', // Vivid indigo-blue
          600: '#5850ec',
          700: '#5145cd',
          800: '#42389d',
          900: '#362f78',
          950: '#231d4f',
        },
        dark: {
          bg: '#0a0a0f',
          card: '#13131a',
          border: '#2a2a35'
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        glow: '0 0 20px rgba(104, 117, 245, 0.4)',
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
