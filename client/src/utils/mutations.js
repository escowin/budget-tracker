import { gql } from "@apollo/client";

// Clientside GraphQL schemas designed to mutate data from the client to the server
// user
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// budget
export const ADD_BUDGET = gql`
  mutation AddBudget($title: String!, $label: String!, $description: String) {
    addBudget(title: $title, label: $label, description: $description) {
      title
      label
      description
    }
  }
`;

export const EDIT_BUDGET = gql`
  mutation EditBudget(
    $id: ID!
    $title: String
    $label: String
    $description: String
  ) {
    editBudget(
      _id: $id
      title: $title
      label: $label
      description: $description
    ) {
      _id
      title
      label
      description
    }
  }
`;

export const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(_id: $id) {
      _id
      title
    }
  }
`;

// item
export const ADD_ITEM = gql`
  mutation AddItem(
    $budgetId: ID!
    $item: String!
    $type: String!
    $num: Float!
  ) {
    addItem(budgetId: $budgetId, item: $item, type: $type, num: $num) {
      _id
      title
      total
      totalExpense
      totalIncome
      items {
        _id
        item
        type
        num
      }
    }
  }
`;

// bug | prints { "data": { "editItem": null } }
// export const EDIT_ITEM = gql`
//   mutation EditItem($id: ID!, $budgetId: ID!, $item: String, $type: String, $num: Float, $note: String) {
//     editItem(_id: $id, budgetId: $budgetId, item: $item, type: $type, num: $num, note: $note) {
//       items {
//         _id
//         item
//         note
//         num
//         type
//       }
//     }
//   }
// `;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!, $budgetId: ID!) {
    deleteItem(_id: $id, budgetId: $budgetId) {
      _id
    }
  }
`;
