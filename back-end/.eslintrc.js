module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: "airbnb-base",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 4],
        "max-len": ["error", { code: 240 }],
    },
};
