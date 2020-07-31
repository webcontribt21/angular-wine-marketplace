import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-details-card',
  templateUrl: './order-details-card.component.html',
  styleUrls: ['./order-details-card.component.scss']
})
export class OrderDetailsCardComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
