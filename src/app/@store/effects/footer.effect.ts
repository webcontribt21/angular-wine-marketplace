import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ErrorResponse } from 'apollo-link-error';

import { FooterApiService } from 'src/app/shared/services/api';
import { LinkType } from 'src/app/shared/interfaces/footer';
import * as footerActions from '../footer/footer.actions';
import * as errorActions from '../errors';

@Injectable()
export class FooterEffect {

  loadFooterCol1Links$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(footerActions.loadFooterCol1Links),
    mergeMap(() => this.footerApiService.getFooterLinksListCol1Data()
      .pipe(
        map((contents: LinkType[]) => footerActions.loadFooterCol1LinksSuccess({ contents })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
          }
        })
      )
    )
  ));

  loadFooterCol2Links$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(footerActions.loadFooterCol2Links),
    mergeMap(() => this.footerApiService.getFooterLinksListCol2Data()
      .pipe(
        map((contents: LinkType[]) => footerActions.loadFooterCol2LinksSuccess({ contents })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
          }
        })
      )
    )
  ));

  loadFooterCol3Links$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(footerActions.loadFooterCol3Links),
    mergeMap(() => this.footerApiService.getFooterLinksListCol3Data()
      .pipe(
        map((contents: LinkType[]) => footerActions.loadFooterCol3LinksSuccess({ contents })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
          }
        })
      )
    )
  ));

  loadAboutCopy$: Observable<any> = createEffect(() => this.action$.pipe(
    ofType(footerActions.loadFooterAboutCopy),
    mergeMap(() => this.footerApiService.getAboutCopyData()
      .pipe(
        map((footerAboutCopy: string) => footerActions.loadFooterAboutCopySuccess({ footerAboutCopy })),
        catchError((responseError: ErrorResponse) => {
          if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
            return of(errorActions.setRequestErrors({ errors: [...responseError.graphQLErrors] }));
          }
        })
      )
    )
  ));

  constructor(
    private action$: Actions,
    private footerApiService: FooterApiService
  ) { }
}
