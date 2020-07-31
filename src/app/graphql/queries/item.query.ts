import gql from 'graphql-tag';

export const items = gql`
  query {
    Items(limit: 0) {
      _id
      name
      description
      referenceCode
      user_id
      supplier_id
      brand_id
      brand {
        name
      }
      country_id
      published
    }
  }
`;

export const itemQuery = gql`
  query item($id: ID!) {
    Item(_id: $id) {
      _id
      name
      description
      itemImages {
        remotePath
        imageUrl: imageUrl_x1200
      }
      brand {
        name
        description
        address
        x
        y
      }
      country {
        name
      }
      itemDetails {
        itemDetailTypeNo
        many
        value
        comment
        type {
          description
        }
        valueFromType {
          description
          imageUrl
        }
      }
      suppliers {
        _id
        supplier {
          _id
          name
        }
        soldInMultiplesOf
        stockQty
        price
      }
    }
  }
`;

export const itemRelatedArticlesQuery = gql`
  query itemRelatedArticles($id: ID!) {
    ItemRelatedArticles(_id: $id) {
      _id
      articleCategoryNo
      articleCategory_id
      timeToRead
      title
      titleShort
      tagline
      body
      user_id
      author_id
      brand_id
      country_id
      region_id
      isPublished
      publishDate
      activeStatus
      dateCreated
      desktopImageName
      desktopImageUrl
      desktopImageEtag
      desktopImageKey
      mobileImageName
      mobileImageUrl
      mobileImageEtag
      mobileImageKey
      cultivar_ids
      keywords
    }
  }
`;
