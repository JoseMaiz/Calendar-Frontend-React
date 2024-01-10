module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    
    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },

    // Alternativa si ocuparamos importar CSS
    // moduleNameMapper: {
    //     "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // }
}
