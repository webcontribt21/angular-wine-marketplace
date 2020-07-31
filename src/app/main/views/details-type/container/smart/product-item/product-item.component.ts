import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/components/common/selectitem';

import { RootState } from '../../../../../../@store/reducers/reducers';
import {
  isLoadingItemSelector,
  itemSelector,
  brandItemsSelector,
  itemRelatedArticlesSelector
} from '../../../../../../@store/item/item.selector';
import * as cartActions from '../../../../../../@store/cart/cart.actions';

import { AnalyticsService } from '../../../../../../shared/services/analytics.service';
import { SeoService } from '../../../../../../shared/services/seo.service';

import { Item } from '../../../../../../shared/interfaces/item.interface';
import { SupplierItem } from '../../../../../../shared/interfaces/supplier-item.intefrace';
import { AddItemToCart } from '../../../../../../shared/interfaces/cart/add-item-to-cart.interface';
import { ItemDetail } from '../../../../../../shared/interfaces/item-detail.interface';

import { ItemDetailType } from '../../../../../../shared/enums/itemDetailTypeNo.enum';
import { Shop } from 'src/app/shared/interfaces/shop.interface';
import { shopSelector } from 'src/app/@store/shop/shop.selector';
import { take } from 'rxjs/operators';
import { ItemDetailTypeValue } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { ItemRelatedArticle } from 'src/app/shared/interfaces/item-related-article.interface';
import { environment } from 'src/environments/environment';
import { ProductDescription } from 'src/app/shared/interfaces/product.interface';

interface Year {
  name: string;
  code: string;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  shop$: Observable<Shop> = this.store$.pipe(select(shopSelector));
  item$: Observable<Item> = this.store$.pipe(select(itemSelector));
  brandItems$: Observable<Item[]> = this.store$.pipe(select(brandItemsSelector));
  itemRelatedArticles$: Observable<ItemRelatedArticle[]> = this.store$.pipe(select(itemRelatedArticlesSelector));

  // shopShippingAndDeliveryInfoSelector
  isLoadingItem$ = this.store$.pipe(select(isLoadingItemSelector));

  displayAlert = false;
  googleApiKey = environment.googleApiKey;
  googleMapUrl = '';

  years: SelectItem[];
  selectedYear: Year;

  public itemDetailTypes = ItemDetailType;
  public soldOut = false;
  public qtyLimit = 59;
  productDescription: ProductDescription;

  selectedCount = { name: '1', code: 1 };
  counts: { name: string; code: number }[] = [];

  constructor(
    private store$: Store<RootState>,
    private analyticsService: AnalyticsService,
    private seoService: SeoService
  ) {
    this.years = [];
    this.productDescription = {
      title: '',
      subtitle: '',
      description: '',
      brand: '',
      id: '',
      imageUrl: '',
      routeKey: '',
      keywords: ''
    };
    console.log('googleApiKey', this.googleApiKey);
  }

  ngOnInit() {

    if (typeof window !== 'undefined') {
      window.scroll(0, 0);
    }

    this.analyticsService.track();

    this.item$.subscribe((item: Item) => {
      if (item !== null) {
        this.soldOut = false;
        let supplierItem = null;
        item.suppliers.forEach((sup: SupplierItem) => {
          if (supplierItem === null) {
            if (sup.stockQty > 0) {
              supplierItem = sup;
            }
          }
        });
        if (supplierItem === null && item.suppliers.length > 0) {
          supplierItem = item.suppliers[0];
        }

        if (supplierItem) {
          this.counts = this.quantities(supplierItem.soldInMultiplesOf, supplierItem.soldInMultiplesOf, supplierItem.stockQty);
          this.selectedCount = this.counts && this.counts[0];
        }

        this.selectedYear = {
          name: this.getItemDetail(item, ItemDetailType.Vintage).value,
          code: this.getItemDetail(item, ItemDetailType.Vintage).value
        };
        if (this.selectedYear.name) {
          this.years = [
            { label: this.selectedYear.name, value: { id: 1, name: this.selectedYear.name, code: this.selectedYear.code } },
          ];
        }

        this.productDescription.title = this.getItemDetail(item, ItemDetailType.Vintage).value + ' ' + item.name;
        this.productDescription.description = item.description;
        this.productDescription.brand = item.brand.name;
        this.productDescription.routeKey = '';
        this.productDescription.imageUrl = this.getItemImage(item);

        this.setSeoMeta();

      }
    });
  }

  setSeoMeta() {
    const seoMetatags = [
      { name: 'keywords', content: this.productDescription.keywords },
      {
        name: 'description',
        content: this.productDescription.description
      },
      { property: 'og:title', content: this.productDescription.title + ' | Port2Port Online Wine Store' },
      {
        property: 'og:description',
        content: this.productDescription.description
      },
      { property: 'og:url', content: 'https://www.port2port.wine/wines/item/' + this.productDescription.routeKey },
      { property: 'og:image', content: this.productDescription.imageUrl },
    ];
    this.seoService.set(this.productDescription.title + ' | Port2Port Online Wine Store', seoMetatags);
  }

  quantities(multiples?: number, currentQty?: number, stockQty?: number): { name: string; code: number }[] {
    const quantities: { name: string; code: number }[] = [];
    const availableQty = stockQty ? (stockQty > this.qtyLimit ? this.qtyLimit : stockQty) : this.qtyLimit;
    multiples = multiples || 1;
    let counter: number = multiples;
    while (counter <= availableQty) {
      quantities.push({ name: counter.toString(), code: counter });
      counter += multiples;
    }

    const currenntItem = quantities.find(f => f.code === currentQty);
    if (!currenntItem) {
      quantities.unshift({ name: currentQty.toString(), code: currentQty });
    }
    return quantities;
  }

  valueToInt(value: string) {
    try {
      return parseInt(value, 10);
    } catch {
      return 0;
    }
  }

  titleCase(str: string) {
    return str.toLowerCase().split(' ').map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  getGoogleMapUrl(item: Item) {
    const mapUrl =
      'https://maps.googleapis.com/maps/api/staticmap?' +
      'key=' +
      this.googleApiKey +
      '&markers=color:orange|' +
      item.brand.x +
      ',' +
      item.brand.y +
      '&center=' +
      item.brand.x +
      ',' +
      item.brand.y +
      '&zoom=6&size=610x360&format=png&maptype=roadmap' +
      item.brand.x +
      ',' +
      item.brand.y +
      '&' +
      this.getMapStyle();

    return mapUrl;
  }

  getGoogleMapHrefUrl(item: Item) {
    const mapUrl =
      'https://www.google.co.za/maps/search/' + item.brand.name + '/@' + item.brand.x + ',' + item.brand.y + ',10z';
    return mapUrl;
  }

  getItemSupplier(item: Item): SupplierItem {
    let supplierItem: SupplierItem = null;

    this.soldOut = false;

    item.suppliers.forEach((sup: SupplierItem) => {
      if (supplierItem === null) {
        if (sup.stockQty > 0) {
          supplierItem = sup;
        }
      }
    });
    if (supplierItem === null && item.suppliers.length > 0) {
      supplierItem = item.suppliers[0];
    }

    this.soldOut = supplierItem !== null ? supplierItem.stockQty === 0 : true;

    return supplierItem;
  }

  getItemImage(item: Item): string {
    if (item.itemImages && item.itemImages.length > 0) {
      return item.itemImages[0].imageUrl;
    }
    return '/assets/img/icons/wines/bottle.svg';
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

  getItemAlcohol(item: Item): string {
    const results = item.itemDetails.filter(t => {
      return +t.itemDetailTypeNo === ItemDetailType.Alcohol;
    });
    if (results.length > 0) {
      return results[0].value + '%';
    }
    return '';
  }

  getItemSugar(item: Item): string {
    const results = item.itemDetails.filter(t => {
      return +t.itemDetailTypeNo === ItemDetailType.Sugar;
    });
    if (results.length > 0) {
      return results[0].value;
    }
    return '';
  }

  getItemCultivar(item: Item): string {
    const results = item.itemDetails
      .filter(t => {
        return +t.itemDetailTypeNo === ItemDetailType.Cultivar;
      })
      .map(r => {
        return (r.value ? r.value + '% ' : '') + (r.valueFromType ? r.valueFromType.description : '');
      });

    return results.join(', ');
  }

  getItemCultivarAsSingleDescriptor(item: Item): string {
    const results = item.itemDetails
      .filter(t => {
        return +t.itemDetailTypeNo === ItemDetailType.Cultivar;
      });

    const resultsType = item.itemDetails
      .filter(t => {
        return +t.itemDetailTypeNo === ItemDetailType.Type;
      });

    const itemType = this.titleCase((resultsType[0] && resultsType[0].valueFromType ? resultsType[0].valueFromType.description : 'Wine'));

    if (results.length > 0 && (
      itemType === 'Red Wine'
      || itemType === 'Red Blend'
      || itemType === 'White Wine'
      || itemType === 'White Blend'
      )) {
      const resultsSortedDescendingValue = results.sort((a, b) => this.valueToInt(b.value) - this.valueToInt(a.value) );
      const result = resultsSortedDescendingValue[0];
      let description = (result.valueFromType ? result.valueFromType.description : '');

      if (results.length === 1) {
        return description;
      } else if (results.length > 1 && this.valueToInt(result.value) >= 70 && this.valueToInt(result.value) <= 100 ) {
        return description + ' Blend';
      } else {
        description = itemType
                        .replace(' Blend', '')
                        .replace(' Wine', '');
        return description + ' Blend';
      }
    }

    return itemType;
  }

  getItemCellaringPotential(item: Item) {
    const hasYearFrom = this.hasItemDetail(item, ItemDetailType.MaturationProtentialFrom);
    const hasYearTo = this.hasItemDetail(item, ItemDetailType.MaturationProtentialTo);

    const yearFrom = this.getItemDetailValue(item, ItemDetailType.MaturationProtentialFrom);
    const yearTo = this.getItemDetailValue(item, ItemDetailType.MaturationProtentialTo);

    if (hasYearFrom && hasYearTo && yearTo != null) {
      return yearFrom + ' to ' + yearTo + ' years';
    } else if (hasYearFrom) {
      // return yearFrom + '+ years';
      return yearFrom;
    } else {
      return 'Up to ' + yearTo + ' years';
    }

    return '';
  }

  getItemDetail(item: Item, value: ItemDetailType): ItemDetail {
    const itemDetails: ItemDetail[] =
      item.itemDetails &&
      item.itemDetails.filter((d: ItemDetail) => {
        return +d.itemDetailTypeNo === value;
      });

    if (itemDetails && itemDetails.length > 0) {
      return itemDetails[0];
    }
    return null;
  }

  getItemDetailValue(item: Item, value: ItemDetailType): string {
    if (this.getItemDetail(item, value) !== null) {
      return this.getItemDetail(item, value).value;
    }
    return '-';
  }

  getItemDetailValueFromType(item: Item, value: ItemDetailType): string {
    if (this.getItemDetail(item, value) !== null) {
      return this.getItemDetail(item, value).valueFromType
        ? this.getItemDetail(item, value).valueFromType.description
        : this.getItemDetailValue(item, value);
    }
    return '-';
  }

  getItemDetailValuesFromType(item: Item, value: ItemDetailType): ItemDetail[] {
    const itemDetails: ItemDetail[] =
      item.itemDetails &&
      item.itemDetails.filter((d: ItemDetail) => {
        return +d.itemDetailTypeNo === value;
      });
    return itemDetails;
  }

  hasItemDetail(item: Item, value: ItemDetailType) {
    return item.itemDetails.filter(x => +x.itemDetailTypeNo === value).length > 0;
  }

  getMapStyle() {
    return 'element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e';
  }

  addItemToCart(item: Item): void {
    const itemDataToCart: AddItemToCart = {
      itemId: item._id,
      itemSupplierId: item.suppliers[0]._id,
      quantity: this.selectedCount.code
    };
    console.log(itemDataToCart);
    this.store$.dispatch(cartActions.addItemToCart({ itemDataToCart }));
  }

  showAlert() {
    this.displayAlert = true;
  }

  trackItemByFn(index, item: Item) {
    return item && item._id;
  }

  trackTagByFn(index, item: ItemDetail) {
    return item && item._id;
  }

  trackItemRelatedArticleByFn(index, item: ItemRelatedArticle) {
    return item && item._id;
  }
}
