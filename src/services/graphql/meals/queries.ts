import { gql } from "@apollo/client";

export const GET_MEALS = gql`
  query Meals {
    meals {
      _id
      name
      maxEntries
    }
  }
`;
