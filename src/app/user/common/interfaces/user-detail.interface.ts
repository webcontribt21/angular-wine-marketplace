export interface UserDetail {
  _id: string;
  shop_id: string;
  supplier_id: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  userTypeNo: number[];
  dateCreated: string;
}
