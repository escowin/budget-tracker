const { User, Budget } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    self: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("budgets");
        return userData;
      }
      throw new AuthenticationError("login required");
    },
    users: async () => {},
    user: async (parent, { username }) => {},
    budgets: async (parent, { username }) => {},
    budget: async (parent, { _id }) => {},
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
      console.log("hey");
    },
    addItem: async (parent, args, context) => {
      console.log("hey");
    },
  },
};

module.exports = resolvers;
