module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    },
    setupTestFrameworkScriptFile: './jest/setup.ts',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/jest/mockFile.js',
        'nav-frontend-ekspanderbartpanel-style': '<rootDir>/jest/mockFile.js',
        'nav-frontend-typografi-style': '<rootDir>/jest/mockFile.js',
        'nav-frontend-knapper-style': '<rootDir>/jest/mockFile.js',
        'nav-frontend-lenker-style': '<rootDir>/jest/mockFile.js',
        '^uttaksplan/(.*)': '<rootDir>/src/uttaksplan/$1',
        '^common/(.*)': '<rootDir>/src/common/$1'
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
            useBabelrc: true
        }
    },
    rootDir: '../'
};
