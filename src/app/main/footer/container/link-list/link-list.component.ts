import { Component, OnInit, Input } from '@angular/core';
import {FOOTER_DATA} from '../../../../shared/constants';
import { LinkType } from 'src/app/shared/interfaces/footer';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {
  @Input() links: LinkType[];
  linkz = FOOTER_DATA.links;

  isHidden: boolean = true;

  constructor() { }

  ngOnInit() {
    // console.log('qqqqqqqqqqqqqq')
  }

  toggle() {
    this.isHidden = !this.isHidden;
  }

}
