const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",

      globals: {
        ...globals.browser,
        ...globals.node,
        chai: "readonly",
        describe: "readonly",
        it: "readonly"
      }
    },

    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"]
    }
  }
];
