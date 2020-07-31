import gql from 'graphql-tag';

export const quickSearchPopularGQL = gql`
  query {
    Items(limit: 5, sort: "-popularScore"){
      _id
      popularScore
      name
      brand {
        name
      }
      itemDetails {
        itemDetailTypeNo
        value
      }
    }
    Articles(limit: 5, activeStatus: true, sort: "-popularScore"){
      _id
      popularScore
      title
      author {
        name
      }
      tagline
    }
  }
`;

export const quickSearchQueryGQL = gql`
  query quickSearch($query: String!){
    SearchItems:searchItems(query: $query, limit: 5, page: 1){
      items {
        _id
        name
        brand {
          _id
          name
        }
        itemImages {
          imageUrl_x240
        }
      }
    }
    Brands(name: $query,activeStatus:true, limit: 3){
      _id
      name
      description
      imageUrl
    }
    Articles(keywords: $query, sort: "-popularScore",activeStatus: true, limit: 3){
      _id
      title
      author{
        name
      }
      popularScore
    }
  }
`;

