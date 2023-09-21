const { Schema } = require("mongoose");
const { validate } = require("../utils/helpers");

const type = ["income", "asset", "debt", "expense"];

const ItemSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
      maxLegnth: 25,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => validate.type(value, type),
        message: "invalid type",
      },
    },
    note: {
      type: String,
      required: false,
      trim: true,
      maxLegnth: 100,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: { getters: true },
  }
);

module.exports = ItemSchema;