import { Country } from './country.interface';

export interface Auth {
  _id: string;
  name: string;
  about: string;
  imageName: string;
  imageUrl: string;
  imageEtag: string;
  imageKey: string;
  country_id: string;
  facebook: string;
  instagram: string;
  twitter: string;
  status: boolean;
  country: Country
}
