import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RATING_ICONS} from '../../../../../constants';
import {Item} from '../../../../../interfaces/item.interface';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss']
})
export class RatingModalComponent implements OnInit {
  @Input() ratings: any[];
  @Input() item: Item;
  @Output() closeRatingModal$: EventEmitter<any> = new EventEmitter<any>();

  icons = RATING_ICONS;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeRatingModal$.emit();
  }
}
