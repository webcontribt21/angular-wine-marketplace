import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { timeSortList } from 'src/app/shared/constants/sort-list';
import { Sort } from 'src/app/shared/interfaces/sortBy';

@Component({
  selector: 'app-story-category-header',
  templateUrl: './story-category-header.component.html',
  styleUrls: ['./story-category-header.component.scss']
})
export class StoryCategoryHeaderComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() sortValue: string = '';
  @Input() isShowSort: boolean = true;
  @Output() sort = new EventEmitter();

  sortList: Sort[];
  sortModel: Sort;

  constructor() {
    this.sortList = [
      { label: 'Sort by: Lastest', value: timeSortList[0] },
      { label: 'Sort by: Most Popular', value: timeSortList[1] }
    ];
    this.sortModel = { label: '', value: '' };
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    const selectedSorts = this.sortList.filter(sort => sort.value === this.sortValue);

    if (selectedSorts[0]) {
      this.sortModel = selectedSorts[0];
    }
  }

  onSortBy(event: object) {
    this.sort.emit(event['value']);
  }
}
