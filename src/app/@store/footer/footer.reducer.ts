import { Action, createReducer, on } from '@ngrx/store';

import * as footerActions from './footer.actions';
import {
  // ArticleType,
  LinkType
} from 'src/app/shared/interfaces/footer';

export interface Footerstate {
  footerCol1LinksContents: LinkType[];
  isLoadingFooterCol1LinksContents: boolean;

  footerCol2LinksContents: LinkType[];
  isLoadingFooterCol2LinksContents: boolean;

  footerCol3LinksContents: LinkType[];
  isLoadingFooterCol3LinksContents: boolean;

  aboutCopy: Object[];
  isLoadingFooterAboutCopy: boolean;
}

const initialState: Footerstate = {

  footerCol1LinksContents: [],
  isLoadingFooterCol1LinksContents: false,

  footerCol2LinksContents: [],
  isLoadingFooterCol2LinksContents: false,

  footerCol3LinksContents: [],
  isLoadingFooterCol3LinksContents: false,

  aboutCopy: [],
  isLoadingFooterAboutCopy: false,
};

const footerReducer = createReducer(
  initialState,
  on(footerActions.loadFooterCol1Links, (state) => {
    return {
      ...state,
      isLoadingFooterCol1LinksContents: true
    };
  }),
  on(footerActions.loadFooterCol1LinksSuccess, (state, { contents }) => {
    const updatedContents = contents.map(content => content );
    // const updatedContents = contents.map(content => console.log(content));
    return {
      ...state,
      footerCol1LinksContents: updatedContents,
      isLoadingFooterCol1LinksContents: false
    };
  }),
  ///
  on(footerActions.loadFooterCol2Links, (state) => {
    return {
      ...state,
      isLoadingFooterCol2LinksContents: true
    };
  }),
  on(footerActions.loadFooterCol2LinksSuccess, (state, { contents }) => {
    const updatedContents = contents.map(content => content );
    // const updatedContents = contents.map(content => console.log(content));
    return {
      ...state,
      footerCol2LinksContents: updatedContents,
      isLoadingFooterCol2LinksContents: false
    };
  }),
  ///
  on(footerActions.loadFooterCol3Links, (state) => {
    return {
      ...state,
      isLoadingFooterCol3LinksContents: true
    };
  }),
  on(footerActions.loadFooterCol3LinksSuccess, (state, { contents }) => {
    const updatedContents = contents.map(content => content );
    // const updatedContents = contents.map(content => console.log(content));
    return {
      ...state,
      footerCol3LinksContents: updatedContents,
      isLoadingFooterCol3LinksContents: false
    };
  }),
  ///
  on(footerActions.loadFooterAboutCopy, (state) => {
    return {
      ...state,
      isLoadingFooterAboutCopy: true
    };
  }),
  on(footerActions.loadFooterAboutCopySuccess, (state, { footerAboutCopy }) => {
    return {
      ...state,
      aboutCopy: footerAboutCopy,
      isLoadingFooterAboutCopy: false
    };
  }),
);

export function reducer(state: Footerstate | undefined, action: Action) {
  return footerReducer(state, action);
}
