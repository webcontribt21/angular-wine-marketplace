import { Component, OnInit } from '@angular/core';
import {FOOTER_ICONS} from '../../../../shared/constants';
import {FooterIcons} from '../../../../shared/interfaces/images.interface';

@Component({
  selector: 'app-medal',
  templateUrl: './medal.component.html',
  styleUrls: ['./medal.component.scss']
})
export class MedalComponent implements OnInit {
  footerIcons: FooterIcons = FOOTER_ICONS;

  constructor() { }

  ngOnInit() {
  }

}
