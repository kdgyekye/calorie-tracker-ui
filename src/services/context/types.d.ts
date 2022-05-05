export interface CurrentUserOutputProps {
    currentUser: User;
  }

  type AdminRole = "ADMINISTRATOR" | "USER";

  export interface User {
    _id: string;
    code: string;
    username: string;
    name: string;
    email: string;
    phone: string;
    country: Country;
    photograph: string;
    suspended: boolean;
    role: AdminRole;
    createdAt: Date;
    updatedAt: Date;
  }