import { gql } from "@apollo/client";

export const QUERY_SELF = gql`
  {
    self {
      username
      budgetCount
      budgets {
        _id
        title
        label
        totalIncome
        totalExpense
        total
      }
    }
  }
`;

export const QUERY_BUDGET = gql`
  query Budget($id: ID!) {
    budget(_id: $id) {
      _id
      createdAt
      title
      label
      totalIncome
      totalExpense
      total
      description
      username
      items {
        _id
        type
        item
        num
        note
      }
    }
  }
`;
