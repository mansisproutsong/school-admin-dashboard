/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        bg: '#F8FAFC',
        ink: '#0F172A',
        muted: '#64748B',
        line: '#E2E8F0',
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        inp: '10px'
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15,23,42,.08)'
      }
    },
  },
  plugins: [],
}