import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {ItemsApiService} from '../../shared/services/api';

@Injectable()
export class WineCategoryEffect {

  constructor(
    private action$: Actions,
    private itemsApiService: ItemsApiService,
  ) {}

}
