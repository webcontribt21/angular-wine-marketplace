import gql from 'graphql-tag';

export const categoriesGQL = gql`query {
  ArticleCategories(limit: 0){
    _id
    description
    articleCategoryNo
  }
}`;

export const articleCategoriesGQL = gql`query {
  ArticleCategories(limit: 0){
    _id
    articleCategoryNo
    description
    articles {
      _id
      timeToRead
      title
      titleShort
      tagline
      author {
        name
      }
      dateCreated
      desktopImageUrl
      mobileImageUrl
      brand {
        name
      }
    }
  }
}`;

export const singleCategoryArticlesGQL = gql`
  query singleCategoryArticlesGQL($id: String) {
    ArticleCategories(categoryNoList: $id){
      _id
      articleCategoryNo
      description
      articles {
        _id
        timeToRead
        title
        titleShort
        tagline
        author {
          name
        }
        dateCreated
        desktopImageUrl
        mobileImageUrl
        brand {
          name
        }
      }
    }
  }
`;

export const singleArticleGQL = gql`
  query singleArticleGQL($id: ID!) {
    Article(_id: $id){
      _id
      articleCategoryNo
      articleCategory {
        description
      }
      timeToRead
      title
      titleShort
      tagline
      author {
        name
      }
      brand {
        name
      }
      dateCreated
      desktopImageUrl
      mobileImageUrl
      articleItem {
        item {
          _id
          name
          description
          brand  {
            name
          }
          itemImages {
            imageUrl
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
        }
      }
      articleMedia {
        imageUrl
      }
      articleRelated {
        _id
        article_id
        related_article_id
        dateCreated
      }
      authorSuggestedItem {
        _id
        item_id
      }
      body
    }
  }
`;

export const moreCategoryArticlesGQL = gql`
  query moreCategoryArticlesGQL($id: String, $limit: Int, $skip: Int) {
    Articles(limit: $limit, skip: $skip, idCategoryList: $id, sort: "-dateCreated"){
      _id
      timeToRead
      title
      titleShort
      tagline
      dateCreated
      desktopImageUrl
      mobileImageUrl
      author {
        name
      }
      brand {
        name
      }
    }
  }
`;

// All Authors
export const allAuthorsGQL = gql`query {
  Authors (limit: 0) {
    _id
    name
    about
    imageUrl
    facebook
    instagram
    twitter
    dateCreated
    articles {
      _id
      title
      titleShort
    }
  }
}`;

// All Authors
export const sortAuthorsGQL = gql`
  query sortAuthorsGQL($sort: String) {
    Authors (limit: 0, sort: $sort) {
      _id
      name
      about
      imageUrl
      facebook
      instagram
      twitter
      dateCreated
      articles {
        _id
        title
        titleShort
      }
    }
  }
`;

// Special Authors
export const speicalAuthorGQL = gql`
  query speicalAuthorGQL($id: ID!) {
    Author(_id: $id){
      _id
      name
      about
      imageUrl
      facebook
      instagram
      twitter
      articles {
        _id
        timeToRead
        title
        titleShort
        tagline
        author {
          name
        }
        dateCreated
        desktopImageUrl
        mobileImageUrl
        brand {
          name
        }
      }
    }
  }
`;

// single category articles of most popular sort
export const mostPopularSingleCategoryArticlesGQL = gql`
  query mostPopularSingleCategoryArticlesGQL($id: String, $limit: Int, $skip: Int) {
    Articles(limit: $limit, skip: $skip, idCategoryList: $id, sort: "-popularScore"){
      _id
      timeToRead
      title
      titleShort
      tagline
      dateCreated
      desktopImageUrl
      mobileImageUrl
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
`;
