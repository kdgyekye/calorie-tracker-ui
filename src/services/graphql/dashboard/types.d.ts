import { IUser } from "../users/types";

export type AverageLastWeekEntry = {
        _id: string;
        total: number;
        avg: number;
        user: IUser[];
}
export interface IAverageEntriesResponse {
    averageLastWeekEntries: AverageLastWeekEntry[];
}