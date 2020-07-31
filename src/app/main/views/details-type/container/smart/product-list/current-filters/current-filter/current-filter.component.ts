import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterData} from '../../../../../../../../shared/interfaces/filter.interface';
import {ProductListIcons} from '../../../../../../../../shared/interfaces/images.interface';
import {FILTERS_ICONS} from '../../../../../../../../shared/constants';

@Component({
  selector: 'app-current-filter',
  templateUrl: './current-filter.component.html',
  styleUrls: ['./current-filter.component.scss']
})
export class CurrentFilterComponent implements OnInit {
  @Input() description: string;
  @Input() icons: ProductListIcons;
  @Output() removeCurrentFilter$: EventEmitter<any> = new EventEmitter<any>();

  deleteFilterIcon: string = FILTERS_ICONS.DELETE;

  constructor() { }

  ngOnInit() {
  }

  removeCurrentFilter(): void {
    this.removeCurrentFilter$.emit(null);
  }
}
