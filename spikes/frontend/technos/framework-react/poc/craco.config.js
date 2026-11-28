const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    postcss: {
      // CRA ignores postcss.config.*: replace its PostCSS plugins with Tailwind v4
      loaderOptions: (options) => ({
        ...options,
        postcssOptions: {
          ...options.postcssOptions,
          plugins: [require('@tailwindcss/postcss')],
        },
      }),
    },
  },
};
