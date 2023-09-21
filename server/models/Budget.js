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
      required: true,
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

BudgetSchema.virtual("totalIncome").get(function () {
  // checks for an existing items array
  if (!this.items) {
    return 0;
  }

  // creates an array of "income" items
  const arr = this.items
    .filter((item) => item.type === "income")
    .map((item) => item.num);
  if (arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce((accumulator, numValue) => {
    return accumulator + numValue;
  }, 0);
  return sum;
});

BudgetSchema.virtual("totalExpense").get(function () {
  if (!this.items) {
    return 0;
  }
  const arr = this.items
    .filter((item) => item.type === "expense")
    .map((item) => item.num);
  if (arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce((accumulator, numValue) => {
    return accumulator + numValue;
  }, 0);
  return sum;
});

BudgetSchema.virtual("total").get(function () {
  return this.totalIncome - this.totalExpense;
});

// virtuals | calculates annual, quarterly, and monthly budget from income, asset, and expense data

const Budget = model("Budget", BudgetSchema);

module.exports = Budget;
