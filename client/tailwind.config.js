/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Navy (Authoritative, not generic blue)
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        // Accent - Light Blue (Professional, trustworthy)
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Success green for data viz
        success: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Data backgrounds
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
      },
      fontFamily: {
        // Headings: Bold, authoritative
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        // Body: Readable, professional
        body: ['Roboto', 'system-ui', 'sans-serif'],
        // Data/numbers: Monospace for financial data
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'data': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
