import {ItemDetailType} from './Item-detail-type.interface';
import {Facet} from './facet.interface';
import {Brand} from './brands.interface';
import {Country} from './country.interface';
import { Shop } from './shop.interface';

export interface AllData {
  ItemDetailTypes: ItemDetailType[];
  searchItems: {
    facets: Facet[];
  }
  Brands: Brand[];
  Countries: Country[];
  ShopByToken: Shop;
}
