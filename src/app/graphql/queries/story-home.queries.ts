import gql from 'graphql-tag';

export const latestStoryGQL = gql`query{
	Articles(sort: "-dateCreated", limit: 1){
    _id
    timeToRead
    title
    titleShort
    tagline
    body
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
}`;

export const featuredStoriesGQL = gql`query {
	SiteContentBlocks(codeName: "stories_top_featured_right") {
    siteContentBlockDetail {
      article {
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
  }
}`;

export const mostPopularStoriesGQL = gql`query {
  Articles(sort: "-popularScore"){
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
}`;

export const topAuthorsGQL = gql`query {
	AuthorTopContributors {
    _id
    name
    about
    imageUrl
  }
}`;

export const videoStoriesGQL = gql`query {
	SiteContentBlocks(codeName: "stories_bottom_video_stories") {
    siteContentBlockDetail {
      article {
        _id
        title
        titleShort
        tagline
        dateCreated
        desktopImageUrl
        mobileImageUrl
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
