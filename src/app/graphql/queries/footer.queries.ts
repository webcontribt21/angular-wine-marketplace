import gql from 'graphql-tag';

export const footerLinkListCol1GQL = gql`query {
  SiteContentBlocks(codeName: "customer_service_links") {
    name
    siteContentBlockDetail {
      linkUrl
    linkText
    }
  }
}`;

export const footerLinkListCol2GQL = gql`query {
  SiteContentBlocks(codeName: "wine_guide_links") {
    name
    siteContentBlockDetail {
      linkUrl
    linkText
    }
  }
}`;

export const footerLinkListCol3GQL = gql`query {
  SiteContentBlocks(codeName: "footer_third_col") {
    name
    siteContentBlockDetail {
      linkUrl
    linkText
    }
  }
}`;

export const aboutCopyGQL = gql`query {
  SiteContentBlocks(codeName: "about_copy") {
    siteContentBlockDetail {
      _id
      rank
      text
    }
  }
}`;

// export const homeFeaturedWinesGQL = gql`query {
//   SiteContentBlocks(codeName: "home_featured_wines") {
//     siteContentBlockDetail {
//       item {
//         _id
//         name
//         description
//         brand  {
//           name
//         }
//         itemImages {
//           imageUrl
//         }
//         country {
//           name
//         }
//         suppliers {
//           soldInMultiplesOf
//           stockQty
//           price
//           supplier {
//             name
//           }
//         }
//         itemDetails {
//           itemDetailTypeNo
//           type {
//             description
//             valueUnit
//           }
//           value
//           valueFromType {
//             description
//           }
//         }
//       }
//     }
//   }
// }`;

// export const homeBottomAdvertLeftGQL = gql`query {
//   SiteContentBlocks(codeName: "home_bottom_advert_left") {
//     siteContentBlockDetail {
//       _id
//       rank
//       text
//       imageUrl
//       linkUrl
//     }
//   }
// }`;

// export const homeBottomStoryRightGQL = gql`query {
//   SiteContentBlocks(codeName: "home_bottom_story_right_long") {
//     siteContentBlockDetail {
//       article {
//         _id
//         title
//         titleShort
//         tagline
//         desktopImageUrl
//         mobileImageUrl
//         dateCreated
//       }
//     }
//   }
// }`;

// export const homeMidArticlesGQL = gql`query {
//   SiteContentBlocks(codeName: "home_mid_articles") {
//     siteContentBlockDetail {
//       article {
//         _id
//         title
//         titleShort
//         tagline
//         desktopImageUrl
//         mobileImageUrl
//         timeToRead
//         dateCreated
//         author {
//           name
//         }
//       }
//     }
//   }
// }`;
