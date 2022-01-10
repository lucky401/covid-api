const mongoose = require('mongoose');

const Province = mongoose.model(
  'Summary',
  new mongoose.Schema(
    {
      updated_at: {
        type: Date,
        required: [true, "Date can't be empty!!"],
        index: true,
      },
      total_positive: {
        type: Number,
        required: [true, "total_positive can't be empty!!"],
      },
      total_recovered: {
        type: Number,
        required: [true, "total_recovered can't be empty!!"],
      },
      total_deaths: {
        type: Number,
        required: [true, "total_deaths can't be empty!!"],
      },
      total_active: {
        type: Number,
        required: [true, "total_active can't be empty!!"],
      },
      new_positive: {
        type: Number,
        required: [true, "new_positive can't be empty!!"],
      },
      new_recovered: {
        type: Number,
        required: [true, "new_recovered can't be empty!!"],
      },
      new_deaths: {
        type: Number,
        required: [true, "new_deaths can't be empty!!"],
      },
      new_active: {
        type: Number,
        required: [true, "new_active can't be empty!!"],
      },
    },
    {
      timestamps: false,
      toJSON: {
        transform(doc, ret) {
          delete ret.updated_at;
          delete ret._id;
          delete ret.__v;
        },
      },
    },
  ),
);

module.exports = Province;
