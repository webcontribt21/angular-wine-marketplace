import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDetailType} from '../../../../../../shared/interfaces/Item-detail-type.interface';
import {Item} from '../../../../../../shared/interfaces/item.interface';
import {SortBy} from '../../../../../../shared/interfaces/sortBy';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss']
})
export class WinesComponent implements OnInit {
  @Input() itemDetailTypes: ItemDetailType[];
  @Input() items: Item[];
  @Input() selectRule: SortBy;
  @Output() closeNavMenu$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index, item) {
    return index;
  }

  closeNavMenu() {
    this.closeNavMenu$.emit();
  }

}
