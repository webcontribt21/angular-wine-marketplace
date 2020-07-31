import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Storystate } from './story.reducer';

export const storyFeatureSelector = createFeatureSelector<Storystate>('storyReducer');

export const isLoadingAllArticlesSelector = createSelector(
  storyFeatureSelector,
  ({ isLoadingAllArticles }: Storystate) => isLoadingAllArticles
);

export const allArticlesSelector = createSelector(
  storyFeatureSelector,
  ({ allArticles }: Storystate) => allArticles
);

export const isLoadingCategoriesSelector = createSelector(
  storyFeatureSelector,
  ({ isLoadingCategories }: Storystate) => isLoadingCategories
);

export const allCategoriesSelector = createSelector(
  storyFeatureSelector,
  ({ allCategories }: Storystate) => allCategories
);

export const isSingleCategoryArticlesSelector = createSelector(
  storyFeatureSelector,
  ({ isSingleCategoryArticles }: Storystate) => isSingleCategoryArticles
);


export const articleCategoryNoSelector = createSelector(
  storyFeatureSelector,
  ({ articleCategoryNo }: Storystate) => articleCategoryNo
);

export const singleCategoryArticlesSelector = createSelector(
  storyFeatureSelector,
  ({ singleCategoryArticles, articleCategoryNo }: Storystate) => singleCategoryArticles[articleCategoryNo] ? singleCategoryArticles[articleCategoryNo] : {}
);

export const isSingleArticleSelector = createSelector(
  storyFeatureSelector,
  ({ isSingleArticle }: Storystate) => isSingleArticle
);

export const singleArticleSelector = createSelector(
  storyFeatureSelector,
  ({ singleArticle }: Storystate) => singleArticle
);

export const singleArticleIdSelector = createSelector(
  storyFeatureSelector,
  ({ singleArticleId }: Storystate) => singleArticleId
);

export const allCategorySortSelector = createSelector(
  storyFeatureSelector,
  ({ categorySorts }: Storystate) => categorySorts['all']
);

// get sort for single category
export const singleCategorySortSelector = createSelector(
  storyFeatureSelector,
  ({ categorySorts, articleCategoryNo }: Storystate) => categorySorts[articleCategoryNo]
);

export const singleCategorySkipSelector = createSelector(
  storyFeatureSelector,
  ({ singleCategorySkips, articleCategoryNo }: Storystate) => {
    return singleCategorySkips[articleCategoryNo]
  }
);

export const moreCategoryArticlesLoadingSelector = createSelector(
  storyFeatureSelector,
  ({ moreCategoryArticlesLoading, articleCategoryNo }: Storystate) => {
    return moreCategoryArticlesLoading[articleCategoryNo]
  }
);

// Authors
export const isLoadingAllAuthorsSelector = createSelector(
  storyFeatureSelector,
  ({ isLoadingAllAuthors }: Storystate) => isLoadingAllAuthors
);

export const allAuthorsSelector = createSelector(
  storyFeatureSelector,
  ({ allAuthors }: Storystate) => allAuthors
);

// Special Author
export const isLoadingSpecialAuthorSelector = createSelector(
  storyFeatureSelector,
  ({ isLoadingSpecialAuthor }: Storystate) => isLoadingSpecialAuthor
);

export const speicalAuthorSelector = createSelector(
  storyFeatureSelector,
  ({ speicalAuthor }: Storystate) => speicalAuthor
);

export const speicalAuthorIdSelector = createSelector(
  storyFeatureSelector,
  ({ speicalAuthorId }: Storystate) => speicalAuthorId
);

// Contributors Sort
export const contributorsSortSelector = createSelector(
  storyFeatureSelector,
  ({ categorySorts }: Storystate) => categorySorts['contributors']
);
