import {Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {PRODUCT_LIST, priceRangeFilter } from '../../../../../../../../../shared/constants';
import {ProductListIcons} from '../../../../../../../../../shared/interfaces/images.interface';
import { priceRangeFilterDescriptionHelper } from '../../../rangeFilterDescriptionHelpers';
import { Subject, timer } from 'rxjs';
import { debounce, takeUntil, tap } from 'rxjs/operators';
import { untilDestroy } from '@ngrx-utils/store';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rangeValues: number[] = null;
  @Output() rangeValues$: EventEmitter<number[]> = new EventEmitter<number[]>();

  changes$ = new Subject<number[]>();
  min: number = priceRangeFilter.min;
  max: number = priceRangeFilter.max;
  rangeValuesInternal: number[];
  step: number = 100;
  icons: ProductListIcons = PRODUCT_LIST;
  isHidden: boolean = true;

  priceRangeFilterDescription = priceRangeFilterDescriptionHelper;

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

  toggle(): void {
    this.isHidden = !this.isHidden;
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
