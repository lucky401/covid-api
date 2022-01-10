const { Router } = require('express');

const { Daily } = require('../../models');
const { DailyService } = require('../../services');

const { response } = require('../../../utils');

const { validator, dateRange } = require('../../../middleware');

const router = Router();

const dailyService = new DailyService(Daily);

module.exports = (routes) => {
  routes.use('/daily', router);

  router.get('/', dateRange.since, dateRange.upto, validator, async (req, res, next) => {
    try {
      const { since, upto } = req.query;
      const query = {
        date: {},
      };

      if (since) {
        query.date.$gte = new Date(since);
      }

      if (upto) {
        query.date.$lte = new Date(upto);
      }

      response.successRes(res, await dailyService.list(query));
    } catch (err) {
      next(err);
    }
  });

  router.get('/:year', dateRange.since, dateRange.upto, validator, async (req, res, next) => {
    try {
      const { since, upto } = req.query;
      const { year } = req.params;

      const query = {
        date: {},
      };

      if (since) {
        query.date.$gte = new Date(since);
      } else {
        query.date.$gte = new Date(`${year}-01-01`);
      }

      if (upto) {
        query.date.$lte = new Date(upto);
      } else {
        query.date.$lt = new Date(`${Number(year) + 1}-01-01`);
      }

      response.successRes(res, await dailyService.list(query));
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:year/:month',
    dateRange.since,
    dateRange.upto,
    validator,
    async (req, res, next) => {
      try {
        const { since, upto } = req.query;
        const { year, month } = req.params;

        const query = {
          date: {},
        };

        if (since) {
          query.date.$gte = new Date(since);
        } else {
          query.date.$gte = new Date(`${year}-${month}`);
        }

        if (upto) {
          query.date.$lte = new Date(upto);
        } else {
          query.date.$lt = new Date(`${year}-${Number(month) + 1}-01`);
        }

        response.successRes(res, await dailyService.list(query));
      } catch (err) {
        next(err);
      }
    },
  );

  router.get('/:year/:month/:date', async (req, res, next) => {
    try {
      const { year, month, date } = req.params;
      const dateString = `${year}-${month}-${date}`;
      response.successRes(res, await dailyService.show({ date: dateString }));
    } catch (err) {
      next(err);
    }
  });
};
