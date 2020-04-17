const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routes
const pageRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

// middleware
const versionMw = require('./mw/versionMw');
const errorMw = require('./mw/errorMw');
// fallback route (404)
const routeFallbackMw = require('./mw/route.fallback');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(versionMw);

// This Should always be above routes.
app.get('/healthcheck', (req, res) => {
  res.status(200).send(true);
});

// Define Routes
app.use('/', pageRouter);
app.use('/api', apiRouter);

// catch fallback 404 and forward to error handler
app.use(routeFallbackMw);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorMw);

module.exports = app;
