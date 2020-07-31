import { createAction, props } from '@ngrx/store';

import {
  STORY_ALL_ARTICLES_LOAD,
  STORY_ALL_ARTICLES_LOAD_SUCCESS,
  STORY_ALL_ARTICLES_LOAD_FAIL,
  STORY_ALL_CATEGORIES_LOAD,
  STORY_ALL_CATEGORIES_LOAD_SUCCESS,
  STORY_ALL_CATEGORIES_LOAD_FAIL,
  STORY_SINGLE_CATEGORY_ARTICLES_LOAD,
  STORY_SINGLE_CATEGORY_ARTICLES_LOAD_SUCCESS,
  STORY_SINGLE_CATEGORY_ARTICLES_LOAD_FAIL,
  STORY_SINGLE_ARTICLE_LOAD,
  STORY_SINGLE_ARTICLE_LOAD_SUCCESS,
  STORY_SINGLE_ARTICLE_LOAD_FAIL,
  STORY_ALL_ARTICLES_SORT,
  STORY_SINGLE_ARTICLES_SORT,
  STORY_SINGLE_CATEGORY_CHANGE,
  STORY_MORE_CATEGORY_ARTICLES_LOAD,
  STORY_MORE_CATEGORY_ARTICLES_LOAD_SUCCESS,
  STORY_MORE_CATEGORY_ARTICLES_LOAD_FAIL,
  STORY_CONTRIBUTORS_LOAD,
  STORY_CONTRIBUTORS_LOAD_SUCCESS,
  STORY_CONTRIBUTORS_LOAD_FAIL,
  STORY_SPECIAL_AUTHOR_LOAD,
  STORY_SPECIAL_AUTHOR_LOAD_SUCCESS,
  STORY_SPECIAL_AUTHOR_LOAD_FAIL,
  STORY_SPECIAL_ARTICLE_SORT,
  STORY_SINGLE_ARTICLES_SORT_SUCCESS
} from './story.types';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { Author } from 'src/app/shared/interfaces/author.interface';

// All Categories' Articles Load
export const loadStoryAllArticles: any = createAction(STORY_ALL_ARTICLES_LOAD);
export const loadStoryAllArticlesSuccess: any = createAction(
  STORY_ALL_ARTICLES_LOAD_SUCCESS,
  props<{ categories: Object[] }>()
);
export const loadStoryAllArticlesError: any = createAction(STORY_ALL_ARTICLES_LOAD_FAIL);

// All Categories Load
export const loadStoryAllCategories: any = createAction(STORY_ALL_CATEGORIES_LOAD);
export const loadStoryAllCategoriesSuccess: any = createAction(
  STORY_ALL_CATEGORIES_LOAD_SUCCESS,
  props<{ categories: Object[] }>()
);
export const loadStoryAllCategoriesError: any = createAction(STORY_ALL_CATEGORIES_LOAD_FAIL);

// Single Category's Articles Load
export const loadStorySingleCategoryArticles: any = createAction(
  STORY_SINGLE_CATEGORY_ARTICLES_LOAD
);
export const loadStorySingleCategoryArticlesSuccess: any = createAction(
  STORY_SINGLE_CATEGORY_ARTICLES_LOAD_SUCCESS,
  props<{ category: Object }>()
);
export const loadStorySingleCategoryArticlesError: any = createAction(STORY_SINGLE_CATEGORY_ARTICLES_LOAD_FAIL);

// Specific Article Load
export const loadStorySingleArticle: any = createAction(
  STORY_SINGLE_ARTICLE_LOAD,
  props<{ id: string }>()
);
export const loadStorySingleArticleSuccess: any = createAction(
  STORY_SINGLE_ARTICLE_LOAD_SUCCESS,
  props<{ article: Object }>()
);
export const loadStorySingleArticleError: any = createAction(STORY_SINGLE_ARTICLE_LOAD_FAIL);

// Sort in All Categories Page
export const sortStoryAllArticles: any = createAction(
  STORY_ALL_ARTICLES_SORT,
  props<{ sort: string }>()
);

// Sort in Specific Category page
export const sortStorySingleArticles: any = createAction(
  STORY_SINGLE_ARTICLES_SORT,
  props<{ sort: string, articleCategoryNo: number }>()
);

export const sortStorySingleArticlesSuccess: any = createAction(
  STORY_SINGLE_ARTICLES_SORT_SUCCESS,
  props<{ articles: Article[] }>()
);

// Category id change in single category
export const storySingleCategoryChange: any = createAction(
  STORY_SINGLE_CATEGORY_CHANGE,
  props<{ id: string }>()
);

// More Articles Load
export const loadStoryMoreCategoryArticles: any = createAction(
  STORY_MORE_CATEGORY_ARTICLES_LOAD
);
export const loadStoryMoreCategoryArticlesSuccess: any = createAction(
  STORY_MORE_CATEGORY_ARTICLES_LOAD_SUCCESS,
  props<{ articles: Article[] }>()
);
export const loadStoryMoreCategoryArticlesError: any = createAction(STORY_MORE_CATEGORY_ARTICLES_LOAD_FAIL);

// Contributors
export const loadStoryAllContributors: any = createAction(
  STORY_CONTRIBUTORS_LOAD,
  props<{ sort: string }>()
);
export const loadStoryAllContributorsSuccess: any = createAction(
  STORY_CONTRIBUTORS_LOAD_SUCCESS,
  props<{ authors: Author[] }>()
);
export const loadStoryAllContributorsError: any = createAction(STORY_CONTRIBUTORS_LOAD_FAIL);

// Special Author
export const loadStorySpecialAuthor: any = createAction(
  STORY_SPECIAL_AUTHOR_LOAD,
  props<{ id: string }>()
);
export const loadStorySpecialAuthorSuccess: any = createAction(
  STORY_SPECIAL_AUTHOR_LOAD_SUCCESS,
  props<{ author: Author }>()
);
export const loadStorySpecialAuthorError: any = createAction(STORY_SPECIAL_AUTHOR_LOAD_FAIL);

// Sort in Specific Article Page
export const sortStorySpecialArticle: any = createAction(
  STORY_SPECIAL_ARTICLE_SORT,
  props<{ sort: string }>()
);
