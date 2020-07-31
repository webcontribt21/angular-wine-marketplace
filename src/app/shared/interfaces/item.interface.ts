import { Country } from './country.interface';
import { ItemImage } from './item-image.interface';
import { ItemDetail } from './item-detail.interface';
import { ItemPrice } from './item-price.intefrace';
import { SupplierItem } from './supplier-item.intefrace';

export interface ItemBrand {
  name: string;
  description: string;
  address: string;
  x: number;
  y: number;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  referenceCode: string;
  user_id: string;
  supplier_id: string;
  brand: ItemBrand;
  highLevelType_key: string;
  country_id: string;
  last_modified: Date;
  schedule_date: Date;
  in_review: boolean;
  incomplete: boolean;
  archived: boolean;
  is_new: boolean;
  itemImages: ItemImage[];
  itemDetails: ItemDetail[];
  country: Country;
  published: boolean;
  prices: ItemPrice[];
  suppliers: SupplierItem[];
  supplier?: SupplierItem;
  price?: number;
  detailVintage: number;
}
