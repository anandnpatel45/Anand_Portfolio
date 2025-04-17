/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#111827',
          card: '#1F2937',
          text: '#F9FAFB',
          muted: '#9CA3AF'
        },
        brown: {
          50: '#efebdf',   // Lightest brown
          100: '#d8c7a7',  // Light brown
          200: '#b49e7d',  // Medium light brown
          300: '#8f7a53',  // Medium brown
          400: '#6b5632',  // Darker brown
          500: '#4a3b1c',  // Base brown
          600: '#3e2f17',  // Dark brown
          700: '#2e2512',  // Very dark brown
          800: '#1d1b0e',  // Almost black brown
          900: '#11110a',  // Darkest brown (close to black)
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-scrollbar'),
  ],
};