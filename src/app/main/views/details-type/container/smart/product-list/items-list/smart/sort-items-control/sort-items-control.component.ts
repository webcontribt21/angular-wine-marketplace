import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SortBy, Sort } from '../../../../../../../../../shared/interfaces/sortBy';
import { sortList } from '../../../../../../../../../shared/constants/sort-list';

@Component({
  selector: 'app-sorts-item-control',
  templateUrl: './sort-items-control.component.html',
  styleUrls: ['./sort-items-control.component.scss']
})
export class SortItemsControlComponent implements OnInit {
  @Output() selectSortRule$: EventEmitter<Sort> = new EventEmitter<Sort>();

  selectRule: Sort = {
    label: '',
    value: ''
  };
  rulesList: Sort[] = sortList;

  constructor() { }

  ngOnInit() {
  }

  selected(event: any) {
    this.selectSortRule$.emit(event.value);
  }
}
