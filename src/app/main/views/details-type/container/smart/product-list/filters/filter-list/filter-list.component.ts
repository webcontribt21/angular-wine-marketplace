import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PRODUCT_LIST} from '../../../../../../../../shared/constants';
import {ProductListIcons} from '../../../../../../../../shared/interfaces/images.interface';
import { FilterData } from 'src/app/shared/interfaces/filter.interface';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
  @Input() title: string;
  @Input() icons: ProductListIcons;
  @Input() data: FilterData[];
  @Input() isPanelOpen: boolean;
  @Output() toggle$ = new EventEmitter<any>();

  noContentWithCount: boolean = false;
  defaultTypesExpanded: string[] = ['type', 'countries'];

  constructor() { }

  ngOnInit() {
    this.noContentWithCount = (this.data.filter((f) => f.count !== 0).length === 0);
  }

  toggle(): void {
    this.toggle$.emit(null);
    // this.isHidden = !this.isHidden;
  }

}
