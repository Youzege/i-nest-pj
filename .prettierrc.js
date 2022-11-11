/** @format */
module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    proseWrap: 'never',
    endOfLine: 'auto',
    semi: false,
    tabWidth: 2,
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
    ],
};
