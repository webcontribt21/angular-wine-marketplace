import gql from 'graphql-tag';

export const singleArticleRelatedWinesGQL = gql`
  query singleArticleRelatedWinesGQL($id: String) {
    ArticleItems(limit: 0, articleItem: {article_id: $id}){
      _id
      item {
        _id
        name
        lastViewed
        description
        brand {
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
          value
          valueFromType {
            description
          }
        }
      }
    }
  }
`;

export const singleArticleRelatedStoriesGQL = gql`
  query singleArticleRelatedStoriesGQL($id: String) {
    ArticleRelateds(limit: 0, articleRelated: {article_id: $id}){
      _id
      relatedArticle {
        _id
        title
        titleShort
        tagline
        desktopImageUrl
        mobileImageUrl
        timeToRead
        dateCreated
        author {
          name
        }
        brand {
          name
        }
        articleCategory {
          description
        }
      }
    }
  }
`;
