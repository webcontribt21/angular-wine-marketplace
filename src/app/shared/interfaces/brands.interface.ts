export interface Brand {
  name: string;
  activeStatus: boolean;
  country_id: string;
  filterWithin: string;
  limit: number;
  skip: number;
  sort: string;
  count?: number;
}
