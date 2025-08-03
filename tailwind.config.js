/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'konecta-primary': '#2800c8',
        'konecta-secondary': '#0F0F72',
        'konecta-light': '#A6B7FF',
        'konecta-yellow': '#f0fa00',
        'konecta-red': '#DB1F51',
        'konecta-orange': '#FD6221',
        'konecta-green': '#0DCA61',
        'konecta-teal': '#09BFAF',
        'konecta-cyan': '#04B4FD',
      },
    },
  },
  plugins: [],
}