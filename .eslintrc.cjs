module.exports = {
  // extends: [
  //   "eslint:recommended",
  //   "plugin:react/recommended",
  //   "plugin:react-hooks/recommended",
  //   "plugin:jsx-a11y/recommended",
  // ],
  // plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
  // parserOptions: {
  //   ecmaVersion: 2021,
  //   sourceType: "module",
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  // },
  // rules: {
  //   "prettier/prettier": "error",
  // },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // Customize rules as per your project's needs
  },
  settings: {
    react: {
      version: "detect", // Automatically includes the React version
    },
  },
};
