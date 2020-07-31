
import { createAction, props } from '@ngrx/store';

import {
  FOOTER_LINKS_COL1_LOAD,
  FOOTER_LINKS_COL1_LOAD_SUCCESS,
  FOOTER_LINKS_COL1_LOAD_FAIL,

  FOOTER_ABOUT_COPY_LOAD,
  FOOTER_ABOUT_COPY_LOAD_SUCCESS,
  FOOTER_ABOUT_COPY_LOAD_FAIL,

  FOOTER_LINKS_COL2_LOAD,
  FOOTER_LINKS_COL2_LOAD_SUCCESS,
  FOOTER_LINKS_COL2_LOAD_FAIL,


  FOOTER_LINKS_COL3_LOAD,
  FOOTER_LINKS_COL3_LOAD_SUCCESS,
  FOOTER_LINKS_COL3_LOAD_FAIL,


} from './footer.types';
import {
  LinkType
} from 'src/app/shared/interfaces/footer';

export const loadFooterCol1Links: any = createAction(FOOTER_LINKS_COL1_LOAD);
export const loadFooterCol1LinksSuccess: any = createAction(
  FOOTER_LINKS_COL1_LOAD_SUCCESS,
  props<{ contents: LinkType[] }>()
);

export const loadFooterCol1LinksError: any = createAction(FOOTER_LINKS_COL1_LOAD_FAIL);
//


export const loadFooterCol2Links: any = createAction(FOOTER_LINKS_COL2_LOAD);
export const loadFooterCol2LinksSuccess: any = createAction(
  FOOTER_LINKS_COL2_LOAD_SUCCESS,
  props<{ contents: LinkType[] }>()
);

export const loadFooterCol2LinksError: any = createAction(FOOTER_LINKS_COL2_LOAD_FAIL);
//


export const loadFooterCol3Links: any = createAction(FOOTER_LINKS_COL3_LOAD);
export const loadFooterCol3LinksSuccess: any = createAction(
  FOOTER_LINKS_COL3_LOAD_SUCCESS,
  props<{ contents: LinkType[] }>()
);

export const loadFooterCol3LinksError: any = createAction(FOOTER_LINKS_COL3_LOAD_FAIL);
//

export const loadFooterAboutCopy: any = createAction(FOOTER_ABOUT_COPY_LOAD);
export const loadFooterAboutCopySuccess: any = createAction(
  FOOTER_ABOUT_COPY_LOAD_SUCCESS,
  props<{ about: Object[] }>()
);
export const loadFooterAboutCopyError: any = createAction(FOOTER_ABOUT_COPY_LOAD_FAIL);
