module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F0F4F8', // Light blue-gray background
        'accent': '#FF385C',
        'accent-dark': '#E00B41',
        'text': '#2D3748', // Dark gray for text
        'purple': {
          light: '#8E4585',
          dark: '#6D3466',
        },
      },
    },
  },
  plugins: [],
}
