import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-wrapper',
  templateUrl: './title-wrapper.component.html',
  styleUrls: ['./title-wrapper.component.scss']
})
export class TitleWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() titleShort: string;

  constructor() { }

  ngOnInit() {
  }

}
