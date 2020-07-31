import {Component, Input, OnInit} from '@angular/core';
import { FilterData } from 'src/app/shared/interfaces/filter.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() filters: FilterData[];
  @Input() firstSectionName: string;

  constructor() { }

  ngOnInit() {
  }

}
