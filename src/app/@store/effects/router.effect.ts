import {Injectable} from '@angular/core';
import {RootState} from '../reducers/reducers';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

@Injectable()
export class RouterEffect {

  constructor(
    private store$: Store<RootState>,
    private action$: Actions,
  ) { }

}
