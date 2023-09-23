import { gql } from "@apollo/client";

export const QUERY_SELF = gql`
  {
    self {
      username
      budgets {
        _id
      }
    }
  }
`;
