module.exports = class DailyService {
  constructor(Daily) {
    this.Daily = Daily;
  }

  async list() {
    const dailyCollections = await this.Daily.find();
    return dailyCollections;
  }

  async create(params) {
    const daily = await this.Daily.create({ ...params });
    return daily;
  }

  async today() {
    const daily = await this.Daily.findOne({ date: Date() });
    return daily;
  }

  async lastInsertData() {
    const daily = await this.Daily.findOne().sort({ date: -1 }).exec();
    return daily;
  }

  async show(params) {
    const daily = await this.Daily.findOne({ ...params });
    return daily;
  }
};
