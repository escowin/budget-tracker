const { Schema, model } = require("mongoose");
const { itemSchema } = require("./Item");
const { validate } = require("../utils/helpers");
const dateFormat = require("../utils/dateFormat");

const type = ["personal", "business", "estate"];

const BudgetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validation: (value) => validate.type(value, type),
        message: "invalid type",
      },
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 250,
    },
    items: [itemSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtuals | calculates annual, quarterly, and monthly budget from income, asset, and expense data

const Budget = model("Budget", BudgetSchema);

module.exports = Budget;
