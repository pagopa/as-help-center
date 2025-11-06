import globals from "globals";
import js from "@eslint/js";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jquery  from "eslint-plugin-jquery";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "**/*.min.js",
      "**/*.log",
      "**/*.tmp",
      "**/assets/common-*"
    ],
  },
  {
    files: ["**/*.js"],
    plugins: {
      jquery
    },
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser, // enable global browser variables like window, document etc.
        ...globals.jquery, // enable jquery global variables
        // enable lotus theme global variables
        LotusUtils: "readonly",
        Alpine: "readonly",
        hljs: "readonly",
        Fancybox: "readonly",
        LotusConfig: "readonly",
        DOMPurify: "readonly",
      }
    },
    rules: {
      "prettier/prettier": "error", // report formatting problems as error
    },
  },
  js.configs.recommended,
  eslintPluginPrettierRecommended,
];