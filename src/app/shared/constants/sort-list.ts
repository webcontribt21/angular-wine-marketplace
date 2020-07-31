import { Sort } from '../interfaces/sortBy';

export const sortList: Sort[] = [
  {
    label: 'Relevance',
    value: ''
  },
  {
    label: 'Price: Highest First',
    value: '-price_zar'
  },
  {
    label: 'Price: Lowest First',
    value: 'price_zar'
  },
  {
    label: 'Wine: A to Z',
    value: 'name'
  },
  {
    label: 'Wine: Z to A',
    value: '-name'
  },
  {
    label: 'Brand: Ascending',
    value: 'brand'
  },
  {
    label: 'Brand: Descending',
    value: '-brand'
  }
];

export const timeSortList = [
  'latest',
  'most_popular'
];
