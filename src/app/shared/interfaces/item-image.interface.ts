import {Item} from './item.interface';

export interface ItemImage {
  _id: string;
  item_id: string;
  remote_id: string;
  remotePath: string;
  item: Item;
  imageUrl: string;
  imageUrl_x240: string;
}
