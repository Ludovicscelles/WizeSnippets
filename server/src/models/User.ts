export interface UserType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  pseudo?: string;
  password: string;
}

export type PublicUserType = Omit<UserType, "password">;

export type RegisterInput = Omit<UserType, "id">;
