  module.exports = {
    verbose: true,
    roots: [
      "./src"
    ],
    modulePaths: [
      "./__stubs__"
    ],
    moduleNameMapper: {
      ".scss$": "scss-stub.js"
    },
    "setupFilesAfterEnv": [
      "./src/setupTests.js"
    ],
    testEnvironment: 'jsdom'
  }
