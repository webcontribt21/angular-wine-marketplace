import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HeartIcons } from '../../../../shared/interfaces/images.interface';
import { AddItemToCart } from '../../../../shared/interfaces/cart/add-item-to-cart.interface';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  @Input() favouriteItems: AddItemToCart[];
  @Input() isAuth: boolean = false;
  @Input() images: HeartIcons;
  @Input() isOpenFavouriteModal: boolean = false;
  @Input() name: string = '';
  @Output() toggleFavouritesModal$: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeFavouritesModal$: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  toggleFavouritesMenu() {
    // this.toggleFavouritesModal$.emit();
    this.isOpenFavouriteModal = !this.isOpenFavouriteModal;
  }

  ngOnDestroy(): void {
    this.closeFavouritesModal$.emit();
  }
}
