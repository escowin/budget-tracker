const { User, Budget } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    self: async (parent, args, context) => {},
    users: async () => {},
    user: async (parent,{ username }) => {},
    budgets: async (parent, { username }) => {},
    budget: async (parent, { _id }) => {},

  },
  Mutation: {
    addUser: async (parent, args) => {},
    login: async (parent, { username, password }) => {},
    addBudget: async (parent, args, context) => {},
    addItem: async (parent, args, context) => {}
  },
};

module.exports = resolvers;
