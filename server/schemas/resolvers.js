const { User, Budget } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    self: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }
      const user = await User.findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate("budgets");
      return user;
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("budgets");
    },
    users: async () => User.find().select("-__v -password").populate("budgets"),
    budget: async (parent, { _id }) => Budget.findOne({_id}),
    budgets: async () => Budget.find()
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addBudget: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required")
      }
      const budget = await Budget.create({
        ...args,
        username: context.user.username
      })
      return budget;
    },
    addItem: async (parent, args, context) => {
      console.log("hey");
    },
  },
};

module.exports = resolvers;
