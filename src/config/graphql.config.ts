import { environment } from 'src/environments/environment';

export const GRAPHQL_CONFIG = {
  uri: environment.apiPath,
  searchItemsLimit: 24,
  startPageForSearchItems: 1,
};
