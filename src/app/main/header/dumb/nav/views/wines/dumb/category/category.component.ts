import {Component, Input, OnInit} from '@angular/core';
import {HEADER_ICONS} from '../../../../../../../../shared/constants';
import {ItemDetailType} from '../../../../../../../../shared/interfaces/Item-detail-type.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() itemDetailType: ItemDetailType;

  upArrow: string = HEADER_ICONS.UP_ARROW;
  downArrow: string = HEADER_ICONS.DOWN_ARROW_SMALL;
  isHidden: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isHidden = !this.isHidden;
  }
}
