import { Item } from '../item.interface';
import { Article } from '../article.interface';
import { Brand } from '../brands.interface';

export interface QuickSearchType {
  Items: Item[];
  SearchItems: {
    items: Item[];
  };
  Articles: Article[];
  Brands: Brand[];
}
