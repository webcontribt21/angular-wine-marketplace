import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadscrumbs',
  templateUrl: './breadscrumbs.component.html',
  styleUrls: ['./breadscrumbs.component.scss']
})
export class BreadscrumbsComponent implements OnInit {
  @Input() breadscrumbs: Object[];

  constructor() { }

  ngOnInit() {
  }

}
