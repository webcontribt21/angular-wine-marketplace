import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.scss']
})
export class WineDetailsComponent implements OnInit {
  @Input() wine: any;
  @Input() stopLink = false;
  @Input() asRelatedItem = false;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  gotoWinePage() {
    if (!this.stopLink) {
      this.router.navigate(['/wines/item/' + this.wine['_id'] + '/' + this.wine['name']]);
    }
  }
}
