import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating-info',
  templateUrl: './rating-info.component.html',
  styleUrls: ['./rating-info.component.scss']
})
export class RatingInfoComponent implements OnInit {
  @Input() rating: any;
  @Output() showDetails$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  isShowDetails() {
    this.showDetails$.emit();
  }
}
