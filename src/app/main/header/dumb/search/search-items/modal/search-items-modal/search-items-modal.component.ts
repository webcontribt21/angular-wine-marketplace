import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuickSearchType } from 'src/app/shared/interfaces/quick-search';
import { deburr } from 'lodash';

@Component({
  selector: 'app-search-items-modal',
  templateUrl: './search-items-modal.component.html',
  styleUrls: ['./search-items-modal.component.scss']
})
export class SeachItemsModalComponent implements OnInit {
  @Input() isAuth: boolean;
  @Input() resultsPopular: QuickSearchType;
  @Input() loadingPopular = true;
  @Input() resultsQuery: QuickSearchType;
  @Input() loadingQuery = true;
  @Input() searchText = '';

  constructor() {}

  ngOnInit() {}

}
