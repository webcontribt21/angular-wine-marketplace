import {ItemDetailTypeValue} from './item-detail-type-value.interface';

export interface ItemDetailType {
  _id: string;
  description: string;
  itemDetailTypeNo: number;
  allowSingleValueOnly: boolean;
  createdByUserId: string;
  valueType: string;
  max: number;
  valueUnit: number;
  sortFilterValuesByCount: boolean;
  itemDetailTypeValues: ItemDetailTypeValue[];
}
