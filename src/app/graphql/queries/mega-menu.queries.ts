import gql from 'graphql-tag';

export const megaMenuFeaturedWinesGQL = gql`query {
  SiteContentBlocks(codeName: "mega_menu_featured_wines") {
    siteContentBlockDetail {
      item {
        rank
        name
        description
        brand  {
          name
        }
        itemImages {
          imageUrl: imageUrl_x380
        }
        country {
          name
        }
        suppliers {
          soldInMultiplesOf
          stockQty
          price
          supplier {
            name
          }
        }
        itemDetails {
          itemDetailTypeNo
          type {
            description
            valueUnit
          }
          value
          valueFromType {
            description
          }
        }
      }
    }
  }
}`;
