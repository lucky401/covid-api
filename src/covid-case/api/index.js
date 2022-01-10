const { Router } = require('express');

const routes = Router();

require('./routes/daily')(routes);
require('./routes/monthly')(routes);
require('./routes/yearly')(routes);
require('./routes/summary')(routes);

module.exports = routes;
