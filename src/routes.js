const { Router } = require('express');

const routes = Router();

routes.use('/', require('./covid-case/api'));

module.exports = (app) => {
  app.use('/', routes);
};
