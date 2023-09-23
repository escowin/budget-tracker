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
