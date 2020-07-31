import {Item} from './item.interface';
import {ItemDetailType} from './Item-detail-type.interface';
import {ItemDetailTypeValue} from './item-detail-type-value.interface';

export interface ItemDetail {
  _id: string;
  item_id: string;
  itemDetailTypeNo: string;
  itemDetailTypeValue_id: string;
  many: boolean;
  value: string;
  valueType: string;
  comment: string;
  available: boolean;
  type: ItemDetailType;
  valueFromType: ItemDetailTypeValue;
  item: Item;
}
