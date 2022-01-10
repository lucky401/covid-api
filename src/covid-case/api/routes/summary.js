const { Router } = require('express');

const { Summary } = require('../../models');
const { SummaryService } = require('../../services');

const { response } = require('../../../utils');

const router = Router();

const summaryService = new SummaryService(Summary);

module.exports = (routes) => {
  routes.use('/', router);

  router.get('/', async (req, res, next) => {
    try {
      const data = await summaryService.show();
      response.successRes(res, data);
    } catch (err) {
      next(err);
    }
  });
};
