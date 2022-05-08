import { gql } from "@apollo/client";

export const GET_FOOD_ENTRIES = gql`
  query FoodEntries(
    $filter: GetFoodEntriesFilter
    $pagination: Pagination
    $populate: [String]
    $startDate: DateTime
    $endDate: DateTime
  ) {
    foodEntries(
      filter: $filter
      pagination: $pagination
      populate: $populate
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      food
      meal {
        name
        _id
      }
      calorieValue
      user {
        name
        _id
        email
        limit
      }
      createdAt
      updatedAt
    }
    foodEntriesLength
  }
`;
