import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPathsPlugin from "eslint-plugin-no-relative-import-paths";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

const config = [
  {
    ignores: [".eslint-cache", ".vercel/**", "node_modules/**", "build/**", "dist/**", "out/**"],
  },
  {
    files: ["**/*.{js,ts,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
        process: "readonly",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".ts"],
        },
      },
    },
    plugins: {
      import: importPlugin,
      "no-relative-import-paths": noRelativeImportPathsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      "no-console": ["warn", { allow: ["error", "info"] }],
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-anonymous-default-export": "warn",
      "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
      "max-lines": ["warn", { max: 750, skipComments: true, skipBlankLines: true }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: ["return"] },
        { blankLine: "always", prev: ["multiline-block-like"], next: "*" },
        { blankLine: "always", prev: "*", next: ["multiline-block-like"] },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "always", prev: "*", next: ["const", "let", "var"] },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          rootDir: "src",
          prefix: "@app",
          allowedDepth: 1,
        },
      ],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      curly: ["error", "all"],
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        module: true,
        require: true,
      },
    },
  },
];

export default config;
