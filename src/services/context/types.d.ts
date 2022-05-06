export interface CurrentUserOutputProps {
    currentUser: User;
  }

  export type LimitReached = {
    calories: number;
    reachedAt: Date;
}

  type AdminRole = "ADMIN" | "USER";

  export interface User {
    _id: string;
    name: string;
    email: string;
    role: AdminRole
    limit: number;
    limitReached: LimitReached[];
  }