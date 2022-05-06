import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      name
      email
      limit
      role
      limitReached {
        calories
        reachedAt
      }
    }
  }
`;
