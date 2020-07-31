import { Country } from './country.interface';
import { Article } from './article.interface';

export interface Author {
  _id: string;
  name: string;
  imageUrl: string;
  about?: string;
  imageName?: string;
  imageEtag?: string;
  imageKey?: string;
  country_id?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  status?: boolean;
  country?: Country;
  articles: Article[];
}
