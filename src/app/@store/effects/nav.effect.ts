import {Injectable} from '@angular/core';
import {RootState} from '../reducers/reducers';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {navMobileDropDownSelector, navModalSelector} from '../nav';

import * as navActions from '../nav/nav.actions';

@Injectable({
  providedIn: 'root',
})

export class NavEffect {

  constructor(
    private action$: Actions,
    private store$: Store<RootState>,
  ) {}

  closeModal$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(navActions.navCloseModal),
      exhaustMap((action) => of(action)
        .pipe(
          map(() => navActions.navUiSet({ payload: {
            isOpenModal: false,
            selected: '',
            clicked: ''
          } }))
        )
      )
    )
  );

  toggleModal$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(navActions.navToggleModal),
      withLatestFrom(this.store$.pipe(select(navModalSelector))),
      map(([{ name }, ui]) => {
        return navActions.navUiSet({ payload: {
          isOpenModal: !ui.isOpenModal,
          clicked: ui.clicked ? '' : name
        } });
      })
    )
  );

  clickCategory$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(navActions.navClickCategory),
      map((nav) => {
        return navActions.navUiSet({ payload: { selected: nav.name } });
      })
    )
  );

  toggleMobileDropMenu$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(navActions.navToggleMobileDropDownMenu),
      withLatestFrom(this.store$.pipe(select(navMobileDropDownSelector))),
      map(([nav, isOpenMenu]) => {
        return navActions.setMobileDropDownMenuData({ payload: { isOpenMenu: !isOpenMenu }})
      })
    )
  )

  closeMobileDropMenu$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(navActions.navCloseMobileDropDownMenu),
      exhaustMap((action) => of(action)
        .pipe(
          map(() => navActions.setMobileDropDownMenuData({ payload: { isOpenMenu: false } }))
        )
      )
    )
  );

}
