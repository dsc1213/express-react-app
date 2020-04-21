const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../.env` });

const { NODE_ENV, WEBPACK_ANALYZE, APP_VERSION } = process.env;

module.exports = {
  vendor: ['react', 'react-dom', 'react-router-dom', 'bootstrap', '@7eleven/7boss-components', 'connected-react-router'],
  nodeEnv: NODE_ENV,
  webpackAnalyze: WEBPACK_ANALYZE,
  appVersion: APP_VERSION,
};
