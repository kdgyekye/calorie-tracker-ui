import { gql } from "@apollo/client";

export const CREATE_FOOD_ENTRY = gql`
  mutation CreateFoodEntry($input: CreateFoodEntryInput!) {
    createFoodEntry(input: $input) {
      food
      meal {
        _id
        name
        maxEntries
      }
      calorieValue
      createdAt
    }
  }
`;

export const UPDATE_FOOD_ENTRY = gql`
  mutation UpdateFoodEntry($input: UpdateFoodEntryInput!) {
    updateFoodEntry(input: $input) {
      food
      meal {
        _id
        name
      }
      calorieValue
      _id
    }
  }
`;
