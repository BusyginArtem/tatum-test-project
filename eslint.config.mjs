import react from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
  ...tseslint.configs.recommended,
});

export default [
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ),
  {
    plugins: {
      react,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {},
  },
  {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: "commonjs",
    },
  },
];
