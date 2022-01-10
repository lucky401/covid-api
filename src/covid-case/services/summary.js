module.exports = class SummaryService {
  constructor(Summary) {
    this.Summary = Summary;
  }

  async show() {
    const summary = await this.Summary.findOne();
    return summary;
  }

  async createOrUpdate(data) {
    const summary = await this.Summary.updateOne({}, data, {
      upsert: true,
      new: true,
    })
      .sort({ updated_at: -1 })
      .exec();
    return summary;
  }
};
