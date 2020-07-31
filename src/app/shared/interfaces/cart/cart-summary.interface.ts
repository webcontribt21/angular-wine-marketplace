import { ItemImage } from '../item-image.interface';

export interface Voucher {
  code: string;
  discountPercent: number;
  discountAmount: number;
  orderDiscountAmount: number;
}

export interface ItemDetailType {
  itemDetailTypeNo: number;
}

export interface ItemDetailTypeValue {
  description: string;
}

export interface ItemDetail {
  type: ItemDetailType;
  valueFromType: ItemDetailTypeValue;
}

export interface Prices {
  currency: string;
  saleType: string;
  saleQuantity: number;
  salePrice: number;
}

export interface Brand {
  name: string;
}

export interface Item {
  _id: string;
  name: string;
  brand: Brand;
  prices: Prices;
  itemDetails: ItemDetail[];
  itemImages: ItemImage[];
}

export interface CartItem {
  _id: string;
  cartItemPrice: number;
  cartItemPriceTotal: number;
  cartItemSoldInQuantitiesOf: number;
  stockQty: number;
  quantity: number;
  quantities: { name: string; code: number }[];
  item: Item[];
}

export interface Shipment {
  _id: string;
  name: string;
  total: number;
  shipmentTotalAmount: number;
  amountToFree: number;
  amountToFreeDisplay: number;
  cartItems: CartItem[];

  shippingFrom?: any;
  value?: any;
  courierDeliveryCharge?: any;
  estimatedDeliveryDate?: any;
  orderCourierNo: number;
  courierName?: any;
  trackingNumber: string;
  orderShipmentStatusNo: number;
  orderShipmentStatusDescription?: any;
  shipmentItems?: any;
}

export interface CartSummary {
  subTotalAmount: number;
  deliveryTotalAmount: number;
  orderTotalAmount: number;
  amountToFreeDisplay: boolean;
  amountToFree: number;
  outstandingAmount: number;
  voucher: Voucher;
  shipments: Shipment[];
}
