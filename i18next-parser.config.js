module.exports = {
    // Key separator used in your translation keys
    keySeparator: '.',
    // Namespace separator used in your translation keys
    namespaceSeparator: ':',
    // Plural separator used in your translation keys
    pluralSeparator: '_',
    // Context separator used in your translation keys
    contextSeparator: '_',

    // Save the \_old files
    createOldCatalogs: true,
    // Save the \_old files with the "en" locale
    // This is useful because you'll be able to see which translations are missing once you add a new language
    // If you want to disable it, set this to false
    saveOldCatalogs: true,

    // Default namespace used in your i18next config
    defaultNamespace: 'translation',
    // Default value to give to empty keys
    // You may also specify a function accepting the locale, namespace, key, and value as arguments
    defaultValue: '',
    // Indentation of the catalog files
    indent: 2,
    // Keep keys from the catalog that are no longer in code
    keepRemoved: false,
    // Key to use for the context of the default value
    keyAsDefaultValue: false,
    // see below for more details
    keyAsDefaultValueForDerivedKeys: false,
    // Default value to give to empty keys
    // You may also specify a function accepting the locale, namespace, key, and value as arguments
    defaultValue: (locale, namespace, key) => key || '',

    // Lexer: Options
    lexer: {
        // Set the default namespace if no namespace is provided
        defaultNamespace: 'translation',
        // Set the default namespace if no namespace is provided
        defaultNsSeparator: ':',
        // Set the default namespace if no namespace is provided
        defaultKeySeparator: false,
    },

    // Line ending to use in the output files
    lineEnding: 'auto',
    // Control the line ending. See options at https://github.com/ryanve/eol
    locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh', 'ko'],
    // An array of the locales in your applications

    // Namespaces
    // An array of the namespaces in your application
    namespaces: ['translation'],

    // Output
    // The location of the translation files relative to the base
    output: 'src/locales/$LOCALE/$NAMESPACE.json',
    // Supports $LOCALE and $NAMESPACE injection
    // Supports JSON (.json) and YAML (.yml) file formats
    // Where to write the locale files relative to process.cwd()
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    // An array of globs that describe where to look for source files
    // relative to the location of the configuration file
    // It can be used to exclude certain files from being parsed
    // If you don't specify it, the parser will look for files containing `i18next` or `react-i18next` imports
    // You can also use the `--input` option in the CLI
    sort: false,
    // Whether or not to sort the catalog. Can also be a [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters)
    // If you want to disable sorting, set this to false
    skipDefaultValues: false,
    // Whether to ignore default values
    // You may also specify a function accepting the locale and namespace as arguments
    useKeysAsDefaultValue: false,
    // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"
    // This option takes precedence over the `defaultValue` and `skipDefaultValues` options
    // You may also specify a function accepting the locale and namespace as arguments
    verbose: false,
    // Display info about the parsing including some stats
    // If you want to disable it, set this to false
    failOnWarnings: false,
    // Exit with an exit code of 1 on warnings
    // If you want to disable it, set this to false
    failOnUpdate: false,
    // Exit with an exit code of 1 when translations are updated, in order to
    // force a commit of the new translation files
    // If you want to disable it, set this to false
    customValueTemplate: null,
    // If you want to customize the value output of the parser, you can provide a function
    // You can also use the `--custom-value-template` option in the CLI
    // If you want to disable it, set this to null
    // The function accepts the locale, namespace, key, and value as arguments
    // It must return a string
    resetDefaultValueLocale: null,
    // The locale to compare with default values to determine whether a default value has been changed.
    // If this is set and a default value differs from a translation in the specified locale, that default value is marked as outdated.
    // If you want to disable it, set this to null
    i18nextOptions: {
        compatibilityJSON: 'v3',
    },
    // If you want to pass options directly to i18next, you can use the `i18nextOptions` option
    // i18next-parse will pass these options to i18next.format() when parsing your files
    yamlOptions: null,
    // If you want to customize the YAML output, you can provide a function
    // You can also use the `--yaml-options` option in the CLI
    // If you want to disable it, set this to null
    // The function accepts the locale, namespace, and value as arguments
    // It must return an object
};
