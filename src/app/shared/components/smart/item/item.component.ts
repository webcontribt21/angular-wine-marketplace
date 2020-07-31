import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../interfaces/item.interface';
import { RATINGS, WINES_ICONS } from '../../../constants';
import { WinesIcons } from '../../../interfaces/images.interface';
import { AddItemToCart } from '../../../interfaces/cart/add-item-to-cart.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() isOnlyPopup: boolean = false;
  @Input() isSquareStyle: boolean;
  @Input() isOpenRatingModal: boolean;
  @Input() isShowAvailableVintages: boolean;
  @Output() addItemToCart$: EventEmitter<AddItemToCart> = new EventEmitter<AddItemToCart>();
  @Output() openRatingModal$: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showAvailableVintages$: EventEmitter<any> = new EventEmitter<any>();

  isAdded: boolean = false;
  isShowPriceWrapper: boolean = false;

  images: WinesIcons = WINES_ICONS;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  showPriceWrapper() {
    this.isShowPriceWrapper = true;
  }

  hidePriceWrapper() {
    this.isShowPriceWrapper = false;
  }

  viewFullDetails() {
    console.log('viewFullDetails', this.item);
    // this.router.navigate([':description/item/:id/:name']);
    console.log(this.router);
    console.log(this.route);
    // const url = this.router.routerState.snapshot.url + '/item/' + this.item._id + '/' + this.item.name;
    const url = '/wines/item/' + this.item._id + '/' + this.item.name;
    console.log(url);

    this.router.navigateByUrl(url);
  }

  getItemRatings(item: Item): { text: string; value: string }[] {
    return item.itemDetails
      .filter(t => {
        return +t.itemDetailTypeNo === ItemDetailType.Ratings;
      })
      .map(r => {
        return {
          text: r.valueFromType
            ? r.valueFromType.description
                .split(' ')
                .map(word => word[0])
                .join('')
            : '-',
          value: r.value
        };
      });
  }

  addItemToCart(itemDataToCart: AddItemToCart) {
    this.addItemToCart$.emit(itemDataToCart);
    this.isAdded = true;
  }

  showRatingDetails() {
    this.openRatingModal$.emit(true);
  }

  closeRatingModal() {
    this.openRatingModal$.emit(false);
  }

  showAvailableVintages() {
    this.showAvailableVintages$.emit();
  }
}
