import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.scss']
})
export class SecondNavComponent implements OnInit {
  @Input() menus: object[];
  @Input() mobileMenus: object[];

  constructor() { }

  ngOnInit() {
  }

}
