import gql from 'graphql-tag';

export const facetsAndItemTypes = gql`query {
    searchItems(query: "", limit: 0) {
      facets {
        name
        value {
          type
          data {
            value
            count
          }
        }
      }
    }

    ItemDetailTypes(limit: 0) {
        _id
        description
        itemDetailTypeNo
        itemDetailTypeValues{
            _id
            description
            itemDetailType_id
        }
    }
}`;
