const mongoose = require('mongoose');

const Province = mongoose.model(
  'Daily',
  new mongoose.Schema(
    {
      date: {
        type: Date,
        required: [true, "Date can't be empty!!"],
        index: true,
      },
      formatted_date: {
        type: String,
        required: [true, "formatted_date can't be empty!!"],
      },
      positive: {
        type: Number,
        required: [true, "positive can't be empty!!"],
      },
      recovered: {
        type: Number,
        required: [true, "recovered can't be empty!!"],
      },
      deaths: {
        type: Number,
        required: [true, "deaths can't be empty!!"],
      },
      active: {
        type: Number,
        required: [true, "active can't be empty!!"],
      },
    },
    {
      timestamps: false,
      toJSON: {
        transform(doc, ret) {
          ret.date = ret.formatted_date;
          delete ret._id;
          delete ret.__v;
          delete ret.formatted_date;
        },
      },
    },
  ),
);

module.exports = Province;
