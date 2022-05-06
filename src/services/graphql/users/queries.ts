import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users($filter: GetUsersFilter) {
    users(filter: $filter) {
      _id
      name
      role
      email
    }
  }
`;
