const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({
    error: false,
    message: 'Hello World!',
  });
});

module.exports = (app) => {
  app.use('/', routes);
};
