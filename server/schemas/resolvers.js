const { User, Job } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // query async methods
  },
  Mutation: {
    // mutation async methods
  },
};

module.exports = resolvers;
