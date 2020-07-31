import {Component, OnInit} from '@angular/core';
import {HEADER_ICONS} from '../../../constants';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  logoUrl: string = HEADER_ICONS.LOGO;

  constructor() { }

  ngOnInit() {
  }

}
