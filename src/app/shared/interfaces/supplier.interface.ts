export interface Supplier {
  _id: string;
  description?: string;
  name: string;
  isActiveInd?: boolean;
  dateCreated?: Date;
  prestashop_id?: number;
  count?: number;
}
