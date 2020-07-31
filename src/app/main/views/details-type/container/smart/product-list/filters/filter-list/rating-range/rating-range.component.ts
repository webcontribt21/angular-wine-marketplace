import {Component, EventEmitter, OnInit, Output, Input, SimpleChanges, OnChanges, OnDestroy} from '@angular/core';
import {PRODUCT_LIST, ratingRangeFilter } from '../../../../../../../../../shared/constants';
import {ProductListIcons} from '../../../../../../../../../shared/interfaces/images.interface';
import { ratingRangeFilterDescriptionHelper } from '../../../rangeFilterDescriptionHelpers';
import { Subject, timer } from 'rxjs';
import { debounce, takeUntil, tap } from 'rxjs/operators';
import { untilDestroy } from '@ngrx-utils/store';

@Component({
  selector: 'app-rating-range',
  templateUrl: './rating-range.component.html',
  styleUrls: ['./rating-range.component.scss']
})
export class RatingRangeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rangeValues: number[] = null;
  @Output() rangeValues$: EventEmitter<number[]> = new EventEmitter<number[]>();

  changes$ = new Subject<number[]>();
  min: number = ratingRangeFilter.min;
  max: number = ratingRangeFilter.max;
  rangeValuesInternal: number[];
  step: number = 1;
  icons: ProductListIcons = PRODUCT_LIST;

  ratingRangeFilterDescription = ratingRangeFilterDescriptionHelper;

  constructor() { }

  ngOnInit() {
    this.changes$.pipe(
      debounce(() => timer(500)),
      untilDestroy(this),
    ).subscribe(s => this.rangeChangedInternal(s));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rangeValues) {
      this.rangeValuesInternal = ((this.rangeValues && [...this.rangeValues]) || [this.min, this.max]);
    }
  }

  ngOnDestroy() {
    // do not remove (required by untilDestroy)
  }

  rangeChanged(event) {
    this.changes$.next(event.values);
  }

  rangeChangedInternal(values: number[]) {
    if (values[0] === this.min && values[1] === this.max) {
      this.rangeValues$.emit(null);
    } else {
      this.rangeValues$.emit([...values]);
    }
  }

  onSubmit() {

  }
}
