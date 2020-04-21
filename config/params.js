const { APP_PORT } = process.env;

module.exports = {
  routes: require('./default/routes'),
  minifyHtml: require('./default/minify.html'),
  port: APP_PORT,
};
