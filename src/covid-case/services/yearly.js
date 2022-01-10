module.exports = class YearlyService {
  constructor(Yearly) {
    this.Yearly = Yearly;
  }

  async list(params) {
    const yearly = await this.Yearly.aggregate([
      {
        $group: {
          _id: { $dateToString: { date: '$date', format: '%Y' } },
          positive: { $sum: '$positive' },
          recovered: { $sum: '$recovered' },
          deaths: { $sum: '$deaths' },
          active: { $sum: '$active' },
        },
      },
      {
        $project: {
          _id: 0,
          positive: 1,
          recovered: 1,
          deaths: 1,
          active: 1,
          year: '$_id',
        },
      },
      {
        $match: { year: params.date },
      },
      {
        $sort: { year: 1 },
      },
    ]);
    return yearly;
  }

  async show(params) {
    const yearly = await this.Yearly.aggregate([
      {
        $group: {
          _id: { $dateToString: { date: '$date', format: '%Y' } },
          positive: { $sum: '$positive' },
          recovered: { $sum: '$recovered' },
          deaths: { $sum: '$deaths' },
          active: { $sum: '$active' },
        },
      },
      {
        $match: { _id: params.date },
      },
      {
        $project: {
          _id: 0,
          positive: 1,
          recovered: 1,
          deaths: 1,
          active: 1,
          year: '$_id',
        },
      },
    ]);
    return yearly;
  }
};
