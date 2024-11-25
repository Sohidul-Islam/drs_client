/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'slide-out': 'slide-out 0.5s ease-in forwards',
      },
      backgroundImage: {
        'bgLogin': "url('/src/assets/bg-login.png')",
        'bgRegister': "url('/src/assets/bg-register.png')",
        'gradient-sky-35': 'var(--gradient-sky-35)',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      container: {
        center: true, // Center the container by default
        // padding: '', // Add default padding around the container
        screens: {
          sm: '100%', // Full width for small screens
          md: '100%', // Custom width for medium screens
          lg: '100%', // Custom width for large screens
          xl: '1480px', // Custom width for extra-large screens
        },
      },
    },
  },
  plugins: [],
}
