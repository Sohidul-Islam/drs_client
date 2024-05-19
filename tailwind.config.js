/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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
