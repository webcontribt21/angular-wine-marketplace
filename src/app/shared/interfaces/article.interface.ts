import { Author } from './author.interface';
import { Brand } from './brands.interface';
import { Item } from './item.interface';

export interface Article {
  _id: string;
  articleCategoryNo?: number;
  articleCategory_id?: string;
  articleCategory?: ArticleCategory;
  timeToRead?: number;
  title: string;
  titleShort: string;
  tagline?: string;
  dateCreated?: Date;
  desktopImageUrl?: string;
  mobileImageUrl?: string;
  activeStatus?: boolean;
  body?: string;
  author?: Author;
  brand?: Brand;
  articleItem?: ArticleItem[];
  articleMedia?: ArticleMedia[];
  articleRelated?: ArticleRelated[];
  authorSuggestedItem?: AuthorSuggestedItem[];
}

export interface ArticleCategory {
  _id: string,
  description: string;
  descriptionPlural?: string;
  articleCategoryNo?: number;
  articles?: Article[];
}

export interface ArticleItem {
  _id: string;
  article_id?: string;
  item_id?: string;
  sortIndex?: number;
  article?: Article;
  item?: Item[];
}

export interface ArticleMedia {
  _id: string;
  article_id?: string;
  rank?: number;
  source?: string;
  value?: string;
  isHeader?: string;
  imageUrl: string;
  imageEtag?: string;
  imageKey?: string;
  isMobileHeader?: string;
  article?: Article;
}

export interface ArticleRelated {
  _id: string;
  article_id: string;
  related_article_id: string;
  dateCreated?: Date;
  article?: Article;
  relatedArticle?: Article;
}

export interface AuthorSuggestedItem {
  _id: string;
  author_id: string;
  item_id: string;
  activeStatus: boolean;
  author: Author;
  item: Item;
}
