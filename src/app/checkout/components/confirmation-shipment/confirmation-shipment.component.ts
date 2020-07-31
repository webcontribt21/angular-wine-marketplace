import { Component, OnInit, Input } from '@angular/core';
import { Shipment } from 'src/app/shared/interfaces/cart/cart-summary.interface';
import { Item } from 'src/app/shared/interfaces/item.interface';
import { ItemDetailType } from 'src/app/shared/enums/itemDetailTypeNo.enum';
import { ItemDetail } from 'src/app/shared/interfaces/item-detail.interface';
import { SupplierItem } from 'src/app/shared/interfaces/supplier-item.intefrace';

@Component({
  selector: 'app-checkout-confirmation-shipment',
  templateUrl: './confirmation-shipment.component.html',
  styleUrls: ['./confirmation-shipment.component.scss']
})
export class CheckoutConfirmationShipmentComponent implements OnInit {
  @Input()
  shipmentNumber: number;
  @Input()
  shipment: Shipment;

  public itemDetailTypes = ItemDetailType;

  constructor() {}

  ngOnInit(): void {}

  getItemImage(item: Item): string {
    if (item.itemImages && item.itemImages.length > 0) {
      return item.itemImages[0].imageUrl;
    }
    return 'https://via.placeholder.com/25x92/A3AAAD/A3AAAD';
  }

  getItemDetailValueFromType(item: Item, value: ItemDetailType): string {
    if (this.getItemDetail(item, value) !== null) {
      return this.getItemDetail(item, value).valueFromType
        ? this.getItemDetail(item, value).valueFromType.description
        : this.getItemDetailValue(item, value);
    }
    return '-';
  }

  getItemDetail(item: Item, value: ItemDetailType): ItemDetail {
    const itemDetails: ItemDetail[] = item.itemDetails.filter((d: ItemDetail) => {
      return +d.itemDetailTypeNo === value;
    });

    if (itemDetails.length > 0) {
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

  getItemSupplier(item: Item): SupplierItem {
    let supplierItem: SupplierItem = null;

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

    return supplierItem;
  }

  getSupplierName(item: Item) {
    const supplierItem = this.getItemSupplier(item);

    if (supplierItem) {
      return supplierItem.supplier.name;
    }

    return '-';
  }
}
