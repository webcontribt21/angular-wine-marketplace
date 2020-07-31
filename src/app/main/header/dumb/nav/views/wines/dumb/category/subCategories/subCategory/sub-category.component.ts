import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemDetailTypeValue} from '../../../../../../../../../../shared/interfaces/item-detail-type-value.interface';
import {RootRouter} from 'src/app/shared/enums';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  @Input() itemDetailTypeValue: ItemDetailTypeValue;
  @Input() parentDescription: string;
  @Output() closeNavMenu$: EventEmitter<any> = new EventEmitter<any>();

  RootRouter = RootRouter;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeNavMenu$.emit();
  }

}
