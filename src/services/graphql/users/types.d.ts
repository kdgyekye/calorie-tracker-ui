export type LimitReached = {
    calories: number;
    reachedAt: Date;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string
    limit: number;
    limitReached: LimitReached[];
}

export interface IUpdateUserInput {
    input: {
        _id?: string;
        name?: string;
        email?: string;
        limit?: number;
        limitReached?: LimitReached[];
    }
}

export interface IUpdateUserResponse {
    updateUser: {
        _id: string;
        name: string;
        email: string;
        limit: number;
        limitReached: LimitReached[];
    }
}