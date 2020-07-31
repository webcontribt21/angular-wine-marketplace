import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import {
  trackingResultStatesSelector,
  loadShipmentTracking
} from 'src/app/@store/user-order';
import { TrackingResultsState } from 'src/app/@store/user-order/user-order.reducer';
import { TrackingResult } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-order-shipment',
  templateUrl: './order-shipment.component.html',
  styleUrls: ['./order-shipment.component.scss']
})
export class OrderShipmentComponent implements OnInit {
  @Input() data: any;

  trackingStates$: Observable<TrackingResultsState[]> = this.store$.pipe(select(trackingResultStatesSelector));

  trackings: TrackingResult[];

  constructor(private store$: Store<RootState>) {
    this.trackings = [];
  }

  ngOnInit() {
    if (this.data['trackingNumber']) {
      this.store$.dispatch(loadShipmentTracking({
        trackingNumber: this.data['trackingNumber']
      }));
    }

    this.trackingStates$.subscribe(trackingStates => {
      if (this.data['trackingNumber'] && trackingStates.length > 0) {
        const targetTrackingStates = trackingStates.filter(trackingState => trackingState.trackingNumber === this.data['trackingNumber']);

        if (targetTrackingStates.length > 0) {
          this.trackings = targetTrackingStates[0].trackingResults;
        }
      }
    })
  }

}
