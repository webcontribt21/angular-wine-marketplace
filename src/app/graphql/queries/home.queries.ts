import gql from 'graphql-tag';

export const homeTopArticlesGQL = gql`query {
  SiteContentBlocks(codeName: "home_top_articles") {
    siteContentBlockDetail {
      article {
        _id
        title
        titleShort
        tagline
        desktopImageUrl
        mobileImageUrl
      }
    }
  }
}`;

export const homeTopAdvertsGQL = gql`query {
  SiteContentBlocks(codeName: "home_top_adverts") {
    siteContentBlockDetail {
      _id
      rank
      title
      text
      imageUrl
      linkUrl
    }
  }
}`;

export const homeFeaturedWinesGQL = gql`query {
  SiteContentBlocks(codeName: "home_featured_wines") {
    siteContentBlockDetail {
      item {
        _id
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

export const homeBottomAdvertLeftGQL = gql`query {
  SiteContentBlocks(codeName: "home_bottom_advert_left") {
    siteContentBlockDetail {
      _id
      rank
      text
      imageUrl
      linkUrl
    }
  }
}`;

export const homeBottomStoryRightGQL = gql`query {
  SiteContentBlocks(codeName: "home_bottom_story_right_long") {
    siteContentBlockDetail {
      article {
        _id
        title
        titleShort
        tagline
        desktopImageUrl
        mobileImageUrl
        dateCreated
        brand {
          name
        }
        articleCategory {
          description
        }
      }
    }
  }
}`;

export const homeMidArticlesGQL = gql`query {
  SiteContentBlocks(codeName: "home_mid_articles") {
    siteContentBlockDetail {
      article {
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
}`;

// Top Features
export const homeTopFeaturesGQL = gql`query {
  SiteContentBlocks(codeName: "home_top_features") {
    siteContentBlockDetail {
      _id
      rank
      linkUrl
      imageUrl
      linkText
      title
      text
    }
  }
}`;

//
export const homePopularWinesGQL = gql`query {
  ItemPopular(limit: 12, skip: 0){
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
}`;

// Top Banner Mobile
export const homeTopBannerMobileGQL = gql`query {
  SiteContentBlocks(codeName: "home_top_features_mobile") {
    siteContentBlockDetail {
      _id
      rank
      linkUrl
      imageUrl
      linkText
      title
      text
    }
  }
}`;
