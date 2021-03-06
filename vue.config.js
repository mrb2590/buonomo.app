const appConfig = require('./src/app.config');

module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title
  },
  publicPath: process.env.BASE_URL,
  css: {
    sourceMap: true
  },
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/]
};
