// prettier.config.js
/** @type {import("prettier").Config} */
export default {
  // Plugins
  plugins: ["prettier-plugin-tailwindcss"],

  // Tailwind CSS: sort classes in these utility functions
  tailwindFunctions: ["clsx", "twMerge"],

  // Formatting options
  singleQuote: false, // Use double quotes instead of single
  semi: true, // Always add semicolons
  trailingComma: "all", // Add trailing commas where valid in ES5 (like objects, arrays)
};
