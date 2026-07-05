/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      colors: {
        // ── Core brand ──────────────────────────────────────
        ceramicBlue:   '#003399',
        goldenYellow:  '#F4B41A',
        offWhite:      '#EEF2F8',   // خلفية رئيسية — رمادي-أزرق دافئ

        // ── Light-mode surfaces ─────────────────────────────
        lightSurface:  '#E2E8F2',   // خلفيات ثانوية
        lightCard:     '#F8FAFD',   // بطاقات
        lightBorder:   '#C5D0E0',   // حدود أوضح
        lightInk: '#334155',
        lightMuted:    '#5A6B85',   // نص ثانوي

        // ── Portuguese accent palette ────────────────────────
        azulejoBlue:   '#002FA7',   // deeper azulejo tile blue
        fatimaGold:    '#D4A017',   // Fátima shrine gold
        verdePortugal: '#006600',   // Portugal flag green

        // ── Dark-mode surfaces ───────────────────────────────
        darkBase:    '#0B0E1A',
        darkSurface: '#131625',
        darkCard:    '#1C2035',
        darkBorder:  '#252940',
      },
      animation: {
        'fade-in':   'fadeIn 0.35s ease-in-out',
        'scale-in':  'scaleIn 0.3s ease-out',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 120s linear infinite',
      },
      keyframes: {
        fadeIn:  {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
