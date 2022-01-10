const { Router } = require('express');

const { Daily } = require('../../models');
const { YearlyService } = require('../../services');

const { response } = require('../../../utils');

const { validator, yearlyRange } = require('../../../middleware');

const router = Router();

const yearlyService = new YearlyService(Daily);

module.exports = (routes) => {
  routes.use('/yearly', router);

  router.get('/', yearlyRange.since, yearlyRange.upto, validator, async (req, res, next) => {
    try {
      const { since, upto } = req.query;
      const query = {
        date: {},
      };

      if (since) {
        query.date.$gte = since;
      }

      if (upto) {
        query.date.$lte = upto;
      }

      response.successRes(res, await yearlyService.list(query));
    } catch (err) {
      next(err);
    }
  });

  router.get('/:year', async (req, res, next) => {
    try {
      const { year } = req.params;
      const dateString = `${year}`;
      const data = await yearlyService.show({ date: dateString });
      response.successRes(res, data[0]);
    } catch (err) {
      next(err);
    }
  });
};
