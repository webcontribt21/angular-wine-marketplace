import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favourites-modal',
  templateUrl: './favourites-modal.component.html',
  styleUrls: ['./favourites-modal.component.scss']
})
export class FavouritesModalComponent implements OnInit {
  @Input() isAuth: boolean;

  constructor() {}

  ngOnInit() {}
}
