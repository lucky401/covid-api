const { check } = require('express-validator');

const dateChecker = (value) => {
  const dateFormatRegex = /^\d{4}\.\d{2}\.\d{2}$/;
  if (!dateFormatRegex.test(value)) return false;
  return true;
};

const isYearQueryEqualYearParam = (yearQuery, yearParam) => {
  if (yearQuery == yearParam) return true;
  return false;
};
const isMonthQueryEqualMonthParam = (MonthQuery, MonthParam) => {
  if (MonthQuery == MonthParam) return true;
  return false;
};

const since = check('since').custom((value, { req }) => {
  if (!value) return true;
  if (!dateChecker(value)) throw new Error('Invalid date format');

  const [yearQuery, monthQuery, dateQuery] = value.split('.');

  const { year, month, date } = req.params;

  if (year && !isYearQueryEqualYearParam(yearQuery, year)) {
    throw new Error('Year query is not equal year param');
  }

  if (month && !isMonthQueryEqualMonthParam(monthQuery, month)) {
    throw new Error('Month query is not equal month param');
  }

  return true;
});

const upto = check('upto').custom((value, { req }) => {
  if (!value) return true;
  if (!dateChecker(value)) throw new Error('Invalid date format');

  const [yearQuery, monthQuery, dateQuery] = value.split('.');

  const { year, month, date } = req.params;

  if (year && !isYearQueryEqualYearParam(yearQuery, year)) {
    throw new Error('Year query is not equal year param');
  }

  if (month && !isMonthQueryEqualMonthParam(monthQuery, month)) {
    throw new Error('Month query is not equal month param');
  }

  return true;
});

module.exports = { since, upto };
