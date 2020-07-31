import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Footerstate } from './footer.reducer';

export const footerFeatureSelector = createFeatureSelector<Footerstate>('footerReducer');

export const isLoadingFooterCol1LinksContentsSelector = createSelector(
  footerFeatureSelector,
  ({ isLoadingFooterCol1LinksContents }: Footerstate) => isLoadingFooterCol1LinksContents
);

export const footerCol1LinksContentsSelector = createSelector(
  footerFeatureSelector,
  ({ footerCol1LinksContents }: Footerstate) => footerCol1LinksContents
);

//

export const isLoadingFooterCol2LinksContentsSelector = createSelector(
  footerFeatureSelector,
  ({ isLoadingFooterCol2LinksContents }: Footerstate) => isLoadingFooterCol2LinksContents
);

export const footerCol2LinksContentsSelector = createSelector(
  footerFeatureSelector,
  ({ footerCol2LinksContents }: Footerstate) => footerCol2LinksContents
);

//

export const isLoadingFooterCol3LinksContentsSelector = createSelector(
  footerFeatureSelector,
  ({ isLoadingFooterCol3LinksContents }: Footerstate) => isLoadingFooterCol3LinksContents
);

export const footerCol3LinksContentsSelector = createSelector(
  footerFeatureSelector,
  ({ footerCol3LinksContents }: Footerstate) => footerCol3LinksContents
);

//

export const isLoadingFooterAboutCopySelector = createSelector(
  footerFeatureSelector,
  ({ isLoadingFooterAboutCopy }: Footerstate) => isLoadingFooterAboutCopy
);

export const footerAboutCopySelector = createSelector(
  footerFeatureSelector,
  ({ aboutCopy }: Footerstate) => aboutCopy
);
