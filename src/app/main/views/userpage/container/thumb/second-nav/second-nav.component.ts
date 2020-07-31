import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.scss']
})
export class SecondNavComponent implements OnInit {
  userMenus: Object[];

  constructor() { }

  ngOnInit() {
    this.userMenus = [
      {
        name: 'Profile',
        link: 'profile'
      },
      {
        name: 'Address Book',
        link: 'address-book'
      },
      {
        name: 'Order History',
        link: 'order-history'
      },
      {
        name: 'Email Preferences',
        link: 'email-preferences'
      }
    ];
  }

}
