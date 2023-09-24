const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    budgetCount: Int
    budgets: [Budget]
  }

  type Budget {
    _id: ID
    title: String
    label: String
    description: String
    username: String
    createdAt: String
    totalIncome: Float
    totalExpense: Float
    total: Float
    items: [Item]
  }

  type Item {
    _id: ID
    item: String
    type: String
    num: Float
    note: String
    createdAt: String
  }

  type Query {
    self: User
    users: [User]
    user(username: String!): User
    budgets(username: String): [Budget]
    budget(_id: ID!): Budget
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth

    addBudget(title: String!, label: String!, description: String): Budget
    editBudget(
      _id: ID!
      title: String
      label: String
      description: String
    ): Budget
    deleteBudget(_id: ID!): Budget

    addItem(
      budgetId: ID!
      item: String!
      type: String!
      num: Float!
      note: String
    ): Budget

    editItem(
      _id: ID!
      budgetId: ID!
      item: String
      type: String
      num: Float
      note: String
    ): Budget

    deleteItem(_id: ID!, budgetId: ID!): Item
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
