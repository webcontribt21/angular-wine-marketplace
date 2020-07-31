import {Component, Input, OnInit} from '@angular/core';
import {FOOTER_DATA, FOOTER_ICONS} from '../../../constants';
import {FooterIcons} from '../../../interfaces/images.interface';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class BottomComponent implements OnInit {
  text: string = FOOTER_DATA.rule.text;
  images: FooterIcons = FOOTER_ICONS;

  constructor() { }

  ngOnInit() {
  }

}
