import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-style-items-control',
  templateUrl: './style-items-control.component.html',
  styleUrls: ['./style-items-control.component.scss']
})
export class StyleItemsControlComponent implements OnInit {
  @Input() isSquareStyle: boolean;
  @Output() isSquareStyle$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  toggleStyle() {
    this.isSquareStyle$.emit();
  }
}
