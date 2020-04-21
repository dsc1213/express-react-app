const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const minifyHTML = require('express-minify-html');

// routes
const pageRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

// middleware
const versionMw = require('./mw/versionMw');
const errorMw = require('./mw/errorMw');
// fallback route (404)
const routeFallbackMw = require('./mw/route.fallback');

const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });

const env = app.get('env');
app.locals.env = env;
const isDevMode = env === 'dev' || env === 'development';

let configs;
// ** LOAD ENV PARAMS
app.locals.configs = configs = require('./config/params');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

if (!isDevMode) {
  // minify only on prod servers
  app.use(minifyHTML(configs.minifyHtml));
  // disable x-powered-by header in prod
  app.disable('x-powered-by');
}

app.use(versionMw);

// This Should always be above routes.
app.get('/healthcheck', (_req, res) => {
  res.status(200).send(true);
});

// Define Routes
app.use('/', pageRouter);
app.use('/api', apiRouter);

// catch fallback 404 and forward to error handler
app.use(routeFallbackMw);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use(errorMw);

module.exports = app;
