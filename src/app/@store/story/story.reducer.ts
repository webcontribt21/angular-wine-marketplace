import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep, concat } from 'lodash';

import * as storyActions from './story.actions';
import { timeSortList } from 'src/app/shared/constants/sort-list';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { Author } from 'src/app/shared/interfaces/author.interface';

export const ARTICLES_LIMIT = 12;

export interface Storystate {
  allArticles: Object[];
  allCategories: Object[];
  allAuthors: Author[];
  singleCategoryArticles: Object;
  singleArticle: Object;
  speicalAuthor: Author;
  articleCategoryNo: number;
  singleArticleId: string;
  categorySorts: object;
  singleCategorySkips: object;
  speicalAuthorId: string;
  isLoadingAllArticles: boolean;
  isLoadingCategories: boolean;
  isSingleCategoryArticles: boolean;
  isSingleArticle: boolean;
  moreCategoryArticlesLoading: object;
  isLoadingAllAuthors: boolean;
  isLoadingSpecialAuthor: boolean;
}

const initialState: Storystate = {
  allArticles: [],
  allCategories: [],
  allAuthors: [],
  singleCategoryArticles: {},
  singleArticle: {},
  speicalAuthor: {
    _id: '',
    name: '',
    imageUrl: '',
    articles: []
  },
  isLoadingAllArticles: false,
  isLoadingCategories: false,
  isSingleCategoryArticles: false,
  isSingleArticle: false,
  articleCategoryNo: null,
  singleArticleId: null,
  speicalAuthorId: null,
  categorySorts: {},
  singleCategorySkips: {},
  moreCategoryArticlesLoading: {},
  isLoadingAllAuthors: false,
  isLoadingSpecialAuthor: false
};

const storyReducer = createReducer(
  initialState,
  on(storyActions.loadStoryAllArticles, (state) => {
    return {
      ...state,
      isLoadingAllArticles: true
    };
  }),
  on(storyActions.loadStoryAllArticlesSuccess, (state, { categories }) => {
    return {
      ...state,
      allArticles: categories,
      isLoadingAllArticles: false
    };
  }),
  on(storyActions.loadStoryAllCategories, (state) => {
    return {
      ...state,
      isLoadingCategories: true
    };
  }),
  on(storyActions.loadStoryAllCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      allCategories: categories,
      isLoadingCategories: false
    };
  }),
  on(storyActions.loadStorySingleCategoryArticles, (state) => {
    return {
      ...state,
      isSingleCategoryArticles: true
    };
  }),
  on(storyActions.loadStorySingleCategoryArticlesSuccess, (state, { category }) => {
    return {
      ...state,
      singleCategoryArticles: {
        ...state.singleCategoryArticles,
        [category['articleCategoryNo']]: category
      },
      isSingleCategoryArticles: false
    };
  }),
  on(storyActions.loadStorySingleArticle, (state, { id }) => {
    return {
      ...state,
      isSingleArticle: true,
      singleArticleId: id
    };
  }),
  on(storyActions.loadStorySingleArticleSuccess, (state, { article }) => {
    const singleArticle = cloneDeep(article);
    singleArticle.articleItem = singleArticle.articleItem
      .map(article => article.item && article.item[0] ? article.item[0] : {});

    return {
      ...state,
      singleArticle,
      isSingleArticle: false
    };
  }),
  on(storyActions.sortStoryAllArticles, (state, { sort }) => {
    const newAllCategories = cloneDeep(state.allArticles);

    if (newAllCategories.length > 0) {
      for (let index = 0; index < newAllCategories.length; index++) {
        const category = newAllCategories[index];

        if (category && category['articles'] && category['articles'].length > 1) {
          category['articles'].sort((a: Article, b: Article) => {
            if (sort === timeSortList[0]) { // latest
              return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
            } else {
              return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
            }
          });
        }
      }
    }

    return {
      ...state,
      categorySorts: {
        ...state.categorySorts,
        all: sort
      },
      allArticles: newAllCategories
    };
  }),
  // Sort for single category
  on(storyActions.sortStorySingleArticles, (state, { sort, articleCategoryNo }) => {
    return {
      ...state,
      isSingleCategoryArticles: true,
      singleCategorySkips: {
        ...state.singleCategorySkips,
        [state.articleCategoryNo]: 0
      },
      categorySorts: {
        ...state.categorySorts,
        [articleCategoryNo]: sort
      }
    };
  }),
  on(storyActions.sortStorySingleArticlesSuccess, (state, { articles, articleCategoryNo }) => {
    const newSingleCategory = cloneDeep(state.singleCategoryArticles[articleCategoryNo]);
    newSingleCategory.articles = articles;

    return {
      ...state,
      isSingleCategoryArticles: false,
      singleCategoryArticles: {
        ...state.singleCategoryArticles,
        [articleCategoryNo]: newSingleCategory
      }
    };
  }),
  on(storyActions.storySingleCategoryChange, (state, { id }) => {
    return {
      ...state,
      articleCategoryNo: id
    };
  }),
  on(storyActions.loadStoryMoreCategoryArticles, (state) => {
    const currentSkip = state.singleCategorySkips[state.articleCategoryNo] ?
      state.singleCategorySkips[state.articleCategoryNo] : 0;

    return {
      ...state,
      singleCategorySkips: {
        ...state.singleCategorySkips,
        [state.articleCategoryNo]: currentSkip + ARTICLES_LIMIT
      },
      moreCategoryArticlesLoading: {
        ...state.moreCategoryArticlesLoading,
        [state.articleCategoryNo]: true
      }
    };
  }),
  on(storyActions.loadStoryMoreCategoryArticlesSuccess, (state, { articles }) => {
    const currentSkip = state.singleCategorySkips[state.articleCategoryNo] ?
      state.singleCategorySkips[state.articleCategoryNo] : 0;
    const newCurrentSkip = articles.length > 0 ? currentSkip : currentSkip - ARTICLES_LIMIT;

    const categorySort = state.categorySorts[state.articleCategoryNo];
    const newSingleCategory = cloneDeep(state.singleCategoryArticles[state.articleCategoryNo]);
    newSingleCategory.articles = concat(newSingleCategory.articles, articles);

    // if (categorySort) {
    //   newSingleCategory.articles.sort((a: Article, b: Article) => {
    //     if (categorySort === timeSortList[0]) { // latest
    //       return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
    //     } else {
    //       return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    //     }
    //   });
    // }

    return {
      ...state,
      singleCategorySkips: {
        ...state.singleCategorySkips,
        [state.articleCategoryNo]: newCurrentSkip
      },
      moreCategoryArticlesLoading: {
        ...state.moreCategoryArticlesLoading,
        [state.articleCategoryNo]: false
      },
      singleCategoryArticles: {
        ...state.singleCategoryArticles,
        [state.articleCategoryNo]: newSingleCategory
      }
    };
  }),
  // Authors
  on(storyActions.loadStoryAllContributors, (state, { sort }) => {
    return {
      ...state,
      categorySorts: {
        ...state.categorySorts,
        contributors: sort ? sort : state.categorySorts['contributors'] 
      },
      isLoadingAllAuthors: true
    };
  }),
  on(storyActions.loadStoryAllContributorsSuccess, (state, { authors }) => {
    return {
      ...state,
      allAuthors: authors,
      isLoadingAllAuthors: false
    };
  }),
  // Special Author
  on(storyActions.loadStorySpecialAuthor, (state, { id }) => {
    return {
      ...state,
      speicalAuthorId: id,
      isLoadingSpecialAuthor: true
    };
  }),
  on(storyActions.loadStorySpecialAuthorSuccess, (state, { author }) => {
    return {
      ...state,
      speicalAuthor: author,
      isLoadingSpecialAuthor: false
    };
  }),
  // Sort for Special Author
  on(storyActions.sortStorySpecialArticle, (state, { sort }) => {
    const newSpeicalAuthor = cloneDeep(state.speicalAuthor);

    if (newSpeicalAuthor.articles.length > 0) {
      newSpeicalAuthor.articles.sort((a: Article, b: Article) => {
        if (sort === timeSortList[0]) { // latest
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        } else {
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        }
      });
    }

    return {
      ...state,
      speicalAuthor: newSpeicalAuthor
    };
  }),
);

export function reducer(state: Storystate | undefined, action: Action) {
  return storyReducer(state, action);
}
