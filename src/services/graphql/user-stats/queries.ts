import { gql } from "@apollo/client";

export const GET_DAYS_LIMIT__EXCEEDED = gql`
  query DaysUserExceededLimit {
    daysUserExceededLimit {
      total
      day
      limit
    }
  }
`;

export const HAS_EXCEEDED_LIMIT = gql`
  query Query {
    hasUserExceededLimitToday
  }
`;
