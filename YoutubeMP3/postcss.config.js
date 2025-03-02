export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Add specific browser targets to ensure proper prefixing
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not IE 11'
      ]
    },
  },
};