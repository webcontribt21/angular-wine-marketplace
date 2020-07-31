import {GRAPHQL_CONFIG} from '../../../config';

export class Page {
  constructor(
    public current: number = GRAPHQL_CONFIG.startPageForSearchItems,
    public size: number = 0,
    public total_pages: number = 0,
    public total_results: number = 0
  ) {}
}
