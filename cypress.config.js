const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      baseUrl: 'https://www.saucedemo.com/',
      defaultCommandTimeout: 10000,
      pageLoadTimeout:100000,
      chromeWebSecurity: false,
      //screenshotOnRunFailure: true,
      waitForAnimations:true,
      force: true
  },
});