export interface IntfUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isBlocked?: number;
  isCommentBlocked?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface IntfLogin {
  email: string;
  password: string;
}
