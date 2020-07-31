export interface UserToken {
  _id?: string;
  user_id: string;
  token: string;
  createdAt?: string;
  expireAt?: string;
}
