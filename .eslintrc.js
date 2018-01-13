const path = require('path');

module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  rules: {
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', {aspects: ['invalidHref']}],
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
  },
  extends: ['airbnb', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, 'config'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'public'),
        ],
      },
    },
  },
};
