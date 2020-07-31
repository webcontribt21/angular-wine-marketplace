import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterData} from '../../../../../../../../../shared/interfaces/filter.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() data: FilterData[];
  @Input() title: string;
  @Output() toggleFilter$: EventEmitter<FilterData> = new EventEmitter<FilterData>();
  @ViewChild('filterInputElement', {static: false}) filterInputElement;

  bSearching: boolean = false;
  searchString: string;
  bFilterRequiresSearch: boolean = false;
  dataOriginal: FilterData[];
  resultCountThreshold: number = 7;

  constructor() { }

  ngOnInit() {
    this.dataOriginal = this.data.filter(f => f.count > 0);
    this.bFilterRequiresSearch = this.dataOriginal.length > this.resultCountThreshold;
  }

  getDataWithCountLength(): number {
    return this.data.filter(d => d.count !== 0).length;
  }

  getFilterRequiresSearch(): boolean {
    this.bFilterRequiresSearch = this.data.filter(f => f.count > 0).length > this.resultCountThreshold;
    return this.bFilterRequiresSearch;
  }

  toggleFilter(filter) {
    this.toggleFilter$.emit(filter);
    this.dataOriginal = this.data.filter(f => f.count > 0);
    this.searchString = '';
    this.applyFilterSearch();
  }

  applyFilterSearch() {
    this.searchString = this.searchString.toLowerCase().trim();
    this.bSearching = this.searchString.length !== 0;
    if (this.bSearching) {
      this.data = this.dataOriginal.filter(f => f.count !== 0 && f.description.toLowerCase().trim().indexOf(this.searchString) !== -1);
    } else {
      this.data = this.dataOriginal.filter(d => d.count !== 0);
    }
  }

  clearFilterSearch() {
    this.searchString = '';
    this.applyFilterSearch();
  }

  onFilterSearchChange() {
    this.applyFilterSearch();
  }

  onFilterSearchFocus() {
    // this.clearFilterSearch();
  }

  trackFilterDataByFn(index, item: FilterData) {
    return item && item.description;
  }
}
