import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/services';
import {Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {isAuth} from './@store/auth';
import {RootState} from './@store/reducers/reducers';
import * as dataActions from './@store/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuth$: Observable<boolean> = this.store$.pipe(select(isAuth));
  refT$: Observable<any>;

  isLoadedVendorFiltersSelector$: Observable<boolean> = this.store$.pipe(select(dataActions.isLoadedVendorFiltersSelector));

  constructor(
    private authService: AuthService,
    private store$: Store<RootState>
  ) {
  }

  ngOnInit(): void {

    this.store$.dispatch(dataActions.loadVendorFilterData());

    this.isLoadedVendorFiltersSelector$.subscribe(loaded => {
      if (loaded) {
        this.store$.dispatch(dataActions.loadData());
      }
    });
    this.refT$ = this.authService.getRefreshToken();
  }
}
