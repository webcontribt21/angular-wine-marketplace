import { Component, OnInit } from '@angular/core';
import {FOOTER_ICONS} from '../../../../shared/constants';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  icons = FOOTER_ICONS;

  constructor() { }

  ngOnInit() {
  }

}
