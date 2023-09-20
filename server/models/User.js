const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    budgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// passwords strings are hashed before saving a user document
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// virtuals | quantifies user's assets & expenses

const User = model("User", UserSchema);

module.exports = User;
