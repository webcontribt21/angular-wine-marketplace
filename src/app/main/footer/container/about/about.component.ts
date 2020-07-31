import { Component, OnInit, Input } from '@angular/core';
import { FOOTER_DATA } from '../../../../shared/constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  // info = FOOTER_DATA.about.info;
  @Input() footerAboutCopy: any;


  constructor() { }

  ngOnInit() {
    // console.log('rrr')
  }

}
