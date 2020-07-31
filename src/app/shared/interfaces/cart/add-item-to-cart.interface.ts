import {Item} from '../item.interface';

export interface AddItemToCart {
  itemId: string;
  itemSupplierId: string;
  quantity: number;
}

export interface ItemInCart {
  _id?: string;
  itemId: string;
  itemSupplierId: string;
  quantity: number;
}
