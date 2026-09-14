import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist/**", "backend/**", "node_modules/**"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      // Flat config has no `env` key; browser + node globals go here instead.
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // eslint-plugin-react (which supplies react/jsx-uses-vars) is not a
      // dependency here, so ESLint cannot see identifiers consumed only as JSX
      // namespaces — `motion` in `<motion.div>` reads as unused. Allow it
      // explicitly rather than deleting imports the components genuinely need.
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^([A-Z_]|motion$)",
          // `const { id, ...data } = form` deliberately drops a field.
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
