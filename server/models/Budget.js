const { Schema, model } = require("mongoose");
const { itemSchema } = require("./Item");
const dateFormat = require("../utils/dateFormat");

const BudgetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
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
