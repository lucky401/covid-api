const schedule = require('node-schedule');
const mongoose = require('mongoose');

const config = require('./config');

const { fetcher } = require('./utils');

mongoose
  .connect(config.db.connectionString, config.db.connectionOptions)
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);

  mongoose.connection.close(() => {
    console.log('Task running successfully');
  });
});

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB');
});

const toJSONLocal = (date) => {
  var local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

const getDailyCasesToInput = async (dailyCases) => {
  const Daily = require('./covid-case/models/Daily');
  const DailyService = require('./covid-case/services/daily');

  const service = new DailyService(Daily);

  try {
    const data = await service.lastInsertData();
    if (!data) return dailyCases;

    const lastItem = dailyCases[dailyCases.length - 1];

    const diffBetweenScrapperAndDatabase =
      new Date(lastItem.key_as_string) - new Date(data.formatted_date);

    if (diffBetweenScrapperAndDatabase === 0) {
      console.log('Data already updated');
      return [];
    }

    return dailyCases.slice(dailyCases.length - diffBetweenScrapperAndDatabase);
  } catch (err) {
    console.error(err);
  }
};

const generateSummary = async ({ penambahan, total }) => {
  const Summary = require('./covid-case/models/Summary');
  const SummaryService = require('./covid-case/services/summary');

  const service = new SummaryService(Summary);

  const date = new Date(penambahan.created);

  const payload = {
    updated_at: date,
    total_positive: total.jumlah_positif,
    total_recovered: total.jumlah_sembuh,
    total_deaths: total.jumlah_meninggal,
    total_active: total.jumlah_dirawat,
    new_positive: penambahan.jumlah_positif,
    new_recovered: penambahan.jumlah_sembuh,
    new_deaths: penambahan.jumlah_meninggal,
    new_active: penambahan.jumlah_dirawat,
  };

  console.dir(payload);

  try {
    await service.createOrUpdate(payload);
  } catch (err) {
    console.error(err);
  }
};

const generateDailySummary = async (data) => {
  const Daily = require('./covid-case/models/Daily');
  const DailyService = require('./covid-case/services/daily');

  const service = new DailyService(Daily);

  for (const item of data) {
    const date = new Date(item.key_as_string);

    const payload = {
      date: date,
      formatted_date: toJSONLocal(date),
      positive: item.jumlah_positif.value,
      recovered: item.jumlah_sembuh.value,
      deaths: item.jumlah_meninggal.value,
      active: item.jumlah_dirawat.value,
    };

    console.dir(payload);

    try {
      await service.create(payload);
    } catch (err) {
      console.error(err);
    }
  }
};

const insertUpdatedData = async (data) => {
  if (!data) return;

  await generateSummary({ penambahan: data.penambahan, total: data.total });

  const dailyCasesToInput = await getDailyCasesToInput(data.harian);
  if (dailyCasesToInput.length < 1) return;

  await generateDailySummary(dailyCasesToInput);
};

const fetchData = async () => {
  const updatedData = await fetcher.updateData(false);
  await insertUpdatedData(updatedData);
};

fetchData();

schedule.scheduleJob('0 0 * * *', async function () {
  console.log('Task running...');
  try {
    await fetchData();
  } catch (error) {
    console.log(error);
  }
});
