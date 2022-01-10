/**
 * Module dependencies.
 */

const cors = require('cors');
const { join } = require('path');
const logger = require('morgan');
const helmet = require('helmet');
require('pkginfo')(module, 'name');
const express = require('express');
const rfs = require('rotating-file-stream');

const config = require('./config');

/**
 * app instance initialization.
 */ 

const app = express();

/**
 * Middleware registration.
 */

app.use(cors(config.cors));
app.use(helmet());
app.use(express.json());

/**
 * Logger setup.
 */

app.use(logger('common'));
app.use(
  logger('combined', {
    stream: rfs.createStream(
      `${module.exports.name}-${new Date()
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .reverse()
        .join('-')}.log`,
      {
        interval: '1d',
        path: join(__dirname, 'log'),
      },
    ),
  }),
);

/**
 * Route registration.
 */

require('./routes')(app);

/**
 * 404 handler.
 */

app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

module.exports = app;
