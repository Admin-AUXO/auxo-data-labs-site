import globals from "globals";
import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tsParser },
      globals: { ...globals.browser },
    },
  },
  {
    ignores: [
      "dist/",
      ".vercel/",
      ".astro/",
      "node_modules/",
      "public/",
      "src/env.d.ts",
    ],
  },
];
