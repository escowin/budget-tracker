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
    budget: async (parent, { _id }) => Budget.findOne({ _id }),
    budgets: async () => Budget.find(),
  },
  Mutation: {
    // user
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

    // budget
    addBudget: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      const budget = await Budget.create({
        ...args,
        username: context.user.username,
      });
      // - establishes user-budget relationship
      await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { budgets: budget._id } },
        { new: true }
      );
      return budget;
    },
    editBudget: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      const { _id, ...updatedFields } = args;
      const budget = await Budget.findByIdAndUpdate(
        _id,
        { $set: updatedFields },
        { new: true }
      );
      if (!budget) {
        throw new Error("budget not found");
      }

      return budget;
    },
    deleteBudget: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      try {
        const budget = await Budget.findByIdAndDelete(_id);
        // removes the deleted item from user budget field
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { budgets: budget._id } },
          { new: true }
        );

        return budget;
      } catch (err) {
        throw new Error("failed to delete budget");
      }
    },

    // item
    addItem: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      const { budgetId, ...itemData } = args;
      const updatedBudget = await Budget.findOneAndUpdate(
        { _id: budgetId },
        { $push: { items: itemData } },
        { new: true, runValidators: true }
      );

      return updatedBudget;
    },
    editItem: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      try {
        const { _id, budgetId, ...updates } = args;
        const budget = await Budget.findOneAndUpdate(
          { _id: budgetId, "items._id": _id },
          { $set: { "items.$": updates } },
          { new: true, runValidators: true }
        );

        return budget;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    deleteItem: async (parent, { _id, budgetId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("login required");
      }

      try {
        const updatedBudget = await Budget.findOneAndUpdate(
          { _id: budgetId },
          { $pull: { items: { _id: _id } } },
          { new: true, runValidators: true }
        );
        if (!updatedBudget) {
          throw new Error("budget not found");
        }

        return updatedBudget;
      } catch (err) {
        throw new Error("failed to delete item");
      }
    },
  },
};

module.exports = resolvers;
