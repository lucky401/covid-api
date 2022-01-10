module.exports = class MonthlyService {
  constructor(Monthly) {
    this.Monthly = Monthly;
  }

  async list(params) {
    const monthly = await this.Monthly.aggregate([
      {
        $group: {
          _id: { $dateToString: { date: '$date', format: '%Y-%m' } },
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
          month: '$_id',
        },
      },
      {
        $match: { month: params.date },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    return monthly;
  }

  async show(params) {
    const monthly = await this.Monthly.aggregate([
      {
        $group: {
          _id: { $dateToString: { date: '$date', format: '%Y-%m' } },
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
          month: '$_id',
        },
      },
    ]);
    return monthly;
  }
};
