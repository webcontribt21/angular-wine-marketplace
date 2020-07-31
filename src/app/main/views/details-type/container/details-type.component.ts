import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../../@store/reducers/reducers';
import { All_SECTIONS } from '../../../../shared/constants';
import { FilterData } from 'src/app/shared/interfaces/filter.interface';
import { customFiltersSelector } from 'src/app/@store/filters/filter.selector';
import { JwModalService } from 'src/app/shared/services/jw-modal.service';
import { addItemToCartClearError } from 'src/app/@store/cart/cart.actions';

@Component({
  selector: 'app-details-type',
  templateUrl: './details-type.component.html',
  styleUrls: ['./details-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsTypeComponent implements OnInit, OnDestroy {
  navigationSubscription;
  currentFilters$: Observable<FilterData[]> = this.store$.pipe(select(customFiltersSelector));
  firstSectionName: string = All_SECTIONS.WINES.DESCRIPTION;

  constructor(
    private store$: Store<RootState>,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: JwModalService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.store$.dispatch(addItemToCartClearError());
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
