const { Router } = require('express');

const { Daily } = require('../../models');
const { DailyService } = require('../../services');

const router = Router();

const dailyService = new DailyService(Daily);

module.exports = (routes) => {
  routes.use('/daily', router);
  router.get('/', async (req, res, next) => {
    try {
      res.status(200).json({
        status: 'success',
        message: 'Daily list.',
        data: {
          daily: await dailyService.list(),
        },
      });
    } catch (err) {
      next(err);
    }
  });
};
