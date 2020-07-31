import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnInit {
  menus: object[];
  mobileMenus: object[];

  constructor() {
    this.menus = [
      {
        name: 'About us',
        mobileName: 'ABOUT US',
        link: 'about'
      },
      {
        name: 'Shipping',
        mobileName: 'SHIPPING',
        link: 'shipping'
      },
      {
        name: 'T&Cs of use',
        mobileName: 'Ts&Cs OF USE',
        link: 'legal/use'
      },
      {
        name: 'T&Cs of sale',
        mobileName: 'Ts&Cs OF SALE',
        link: 'legal/sale'
      },
      {
        name: 'Privacy policy',
        mobileName: 'PRIVACY POLICY',
        link: 'legal/privacy'
      },
      {
        name: 'Contact us',
        mobileName: 'CONTACT US',
        link: 'contact'
      }
    ];

    this.mobileMenus = [
      {
        name: 'SHIPPING',
        link: 'shipping'
      },
      {
        name: 'About Us',
        mobileName: 'ABOUT US',
        link: 'about'
      },
      {
        name: 'Ts&Cs OF USE',
        link: 'legal/use'
      },
      {
        name: 'Ts&Cs OF SALE',
        link: 'legal/sale'
      },
      {
        name: 'PRIVACY POLICY',
        link: 'legal/privacy'
      },
      {
        name: 'CONTACT US',
        link: 'contact'
      }
    ];
  }

  ngOnInit() {
  }

}
