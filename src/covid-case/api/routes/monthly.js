const { Router } = require('express');

const { Daily } = require('../../models');
const { MonthlyService } = require('../../services');

const { response } = require('../../../utils');

const { validator, monthlyRange } = require('../../../middleware');

const router = Router();

const monthlyService = new MonthlyService(Daily);

module.exports = (routes) => {
  routes.use('/monthly', router);

  router.get('/', monthlyRange.since, monthlyRange.upto, validator, async (req, res, next) => {
    try {
      const { since, upto } = req.query;
      const query = {
        date: {},
      };

      if (since) {
        query.date.$gte = since.replace('.', '-');
      }

      if (upto) {
        query.date.$lte = upto.replace('.', '-');
      }

      response.successRes(res, await monthlyService.list(query));
    } catch (err) {
      next(err);
    }
  });

  router.get('/:year', monthlyRange.since, monthlyRange.upto, validator, async (req, res, next) => {
    try {
      const { since, upto } = req.query;
      const { year } = req.params;

      const query = {
        date: {},
      };

      if (since) {
        query.date.$gte = since.replace('.', '-');
      } else {
        query.date.$gte = `${year}-01`;
      }

      if (upto) {
        query.date.$lte = upto.replace('.', '-');
      } else {
        query.date.$lt = `${Number(year) + 1}-01`;
      }

      response.successRes(res, await monthlyService.list(query));
    } catch (err) {
      next(err);
    }
  });

  router.get('/:year/:month', async (req, res, next) => {
    try {
      const { year, month } = req.params;
      const dateString = `${year}-${month}`;
      const data = await monthlyService.show({ date: dateString });
      response.successRes(res, data[0]);
    } catch (err) {
      next(err);
    }
  });
};
