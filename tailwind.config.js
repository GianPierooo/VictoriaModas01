/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          DEFAULT: '#f7cac9',
          light: '#fff5f5',
          dark: '#f8b5b8',
          100: '#fde9e7',
          200: '#f8b5b8',
          50: '#fff9f9',
        },
      },
      fontFamily: {
        sans: ['Roboto Flex', 'sans-serif'],
        serif: ['Bodoni Moda', 'serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
      boxShadow: {
        'rose': '0 4px 20px rgba(247, 202, 201, 0.3)',
        'rose-md': '0 6px 25px rgba(247, 202, 201, 0.4)',
        'rose-lg': '0 10px 40px rgba(247, 202, 201, 0.5)',
        'rose-xl': '0 15px 50px rgba(247, 202, 201, 0.6)',
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #f7cac9 0%, #fde9e7 100%)',
        'gradient-rose-light': 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
        'gradient-radial-rose': 'radial-gradient(circle, rgba(247, 202, 201, 0.1) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

