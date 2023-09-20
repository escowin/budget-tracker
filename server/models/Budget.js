const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const BudgetSchema = new Schema(
  {
    income: {
      type: String,
      required: true,
      trim: true,
    },
    assets: {
      type: String,
      trim: true,
    },
    expense: {
      type: String,
      trim: true,
    },
    debt: {
      type: String,
      trim: true
    },
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
  }
);

// virtuals | calculates annual, quarterly, and monthly budget from income, asset, and expense data


const Budget = model("Budget", BudgetSchema);

module.exports = Budget;
