module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['Minecraft Regular', 'sans-serif'],
        minecraftBold: ['Minecraft Bold', 'sans-serif'],
      },
      backgroundImage: {
        'dirt-pattern': "url('./assets/dirtbackground.webp')",
      },
    },
  },
  plugins: [],
};