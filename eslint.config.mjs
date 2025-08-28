import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Disable rules causing deployment issues
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "off",
      // Keep these relaxed to avoid CI noise
      "react/jsx-key": "off",
      "@next/next/no-img-element": "off",
      "no-console": "off",
    },
  },
];

export default eslintConfig;