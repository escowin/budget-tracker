const { Schema, model } = require("mongoose");
const itemSchema = require("./Item");
const { validate, format } = require("../utils/helpers");

const label = ["personal", "business", "estate"];

const BudgetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    label: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => validate.type(value, label),
        message: "invalid label",
      },
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 250,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => format.date(timestamp),
    },
    items: [itemSchema],
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
