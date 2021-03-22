module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'quotes': ['error', 'single'],
    'require-jsdoc': 0,
    'no-multi-str': 0,
    'new-cap': 0,
    'max-len': 0,
    // windows linebreaks when not in production environment
    'linebreak-style': ['error', false ? 'unix' : 'windows'],
  },
};
