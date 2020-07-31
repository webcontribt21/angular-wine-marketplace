import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDetailTypeValue} from '../../../../../../../../../shared/interfaces/item-detail-type-value.interface';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {
  @Input() itemDetailTypeValues: ItemDetailTypeValue[];
  @Input() parentIdx: number;
  @Input() parentDescription: string;
  @Output() closeNavMenu$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closeNavMenu() {
    this.closeNavMenu$.emit();
  }

}
