// src/types/User.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
  created: string | Date;
}

export interface UserResponse {
  users: IUser[];
}

export interface SingleUserResponse {
  user: IUser;
}