import {Item} from './item.interface';

export interface ItemPrice {
  _id: string;
  item_id: string;
  currency: string;
  sale_type: string;
  sale_price: number;
  sale_quantity: number;
  auction_price_min: number;
  auction_price_inc: number;
  auction_enddate: Date;
  item: Item;
}
