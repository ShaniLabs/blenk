const {createGlobPatternsForDependencies} = require('@nx/angular/tailwind');
const {join} = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [
    require('daisyui')
  ],
};
