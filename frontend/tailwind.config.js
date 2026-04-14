/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2563eb',
        dark: '#0f172a',
        soft: '#f8fafc'
      }
    }
  },
  plugins: []
};
