import { IMeal } from "../meals/types";

export interface ICreateFoodEntryInput {
  input: {
    food: string;
    meal: string;
    calorieValue: number;
    user?: string;
  };
}

export interface ICreateFoodEntryResponse {
  createFoodEntry: {
    id: string;
    food: string;
    createdAt;
  };
}

export interface IUpdateFoodEntryInput {
  input: {
    _id: string;
    food: string;
    meal: string;
    calorieValue: number;
    user?: string;
  };
}

export interface IUpdateFoodEntryResponse {
  updateFoodEntry: {
    id: string;
    food: string;
    createdAt;
  };
}

export interface IFoodEntry {
  _id: string;
  food: string;
  meal: IMeal;
  calorieValue: number;
  user?: any
  createdAt: string;
}
