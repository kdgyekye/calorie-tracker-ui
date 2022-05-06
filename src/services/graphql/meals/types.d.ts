export interface IGetMealsResponse {
    meals: {
        _id: string;
        name: string;
        maxEntries: number;
    }[]
}

export interface IGetMealsInput {
    filter?: {
        name?: string;
        maxEntries?: number;
    }
}

export interface IMeal {
    _id: string;
    name: string;
    maxEntries: number;
}