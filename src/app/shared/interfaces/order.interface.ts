import { Shop } from './shop.interface';
import { ShippingAddress, BillingAddress } from './checkout/order-summary.interface';
import { Item } from './item.interface';
import { Payment } from './payment.interface';

export interface OrderStatus {
  _id: string;
  description: string;
  dateCreated?: Date;
  datePatched?: Date;
  userResponsibleForLatestPatchId?: string;
  status: boolean;
  orderStatusNumber?: number;
}

export interface OrderItem {
  _id: string;
  order_id?: string;
  item_id?: string;
  quantity?: number
  dateCreated?: Date;
  price?: number;
  order?: Order;
  item: Item[];
}

export interface OrderSummaryShipment {
  _id: string;
  shippingFrom?: string;
  value?: number;
  courierDeliveryCharge?: number;
  estimatedDeliveryDate?: Date;
  orderCourierNo?: number;
  courierName?: string;
  trackingNumber?: string;
  orderShipmentStatusNo?: number;
  orderShipmentStatusDescription?: string;
  shipmentItems?: OrderItem[];
}

export interface User {
  _id: string;
  shop_id: string;
  supplier_id?: string;
  firstName?: string
  lastName?: string
  email: string
  password: string
  status?: boolean
  userTypeNo?: number[];
  dateCreated?: Date;
  name: string;
}

export interface Order {
  _id: string;
  shop_id?: string;
  user_id: string;
  dateCreated?: Date;
  dateCompleted?: Date;
  orderStatusNumber?: number;
  orderNumber: number;
  orderReference?: string;
  isConsolidated?: boolean;
  isGift?: boolean;
  giftSender?: string;
  giftRecipient?: string;
  additionalInformation?: string;
  giftMessage?: string;
  orderStatus?: OrderStatus[];
  user?: User;
  shop?: Shop;
}

export interface OrderSummary {
  order_id: string;
  orderReference?: string;
  orderNumber?: string;
  dateCreated?: Date;
  estimatedDeliveryDateFrom?: Date;
  estimatedDeliveryDateTo?: Date;
  subTotalAmount?: number;
  orderTotalAmount?: number;
  outstandingAmount?: number;
  shippingAddress?: ShippingAddress;
  billingAddress?: BillingAddress;
  shipments?: OrderSummaryShipment[];
  orderPayment?: Payment;
  cellNumber?: string;
}

export interface TrackingResult {
  WaybillNumber: string;
  UpdateCode?: string;
  UpdateDescription?: string;
  UpdateDateTime?: string;
  UpdateLocation?: string;
  Comments?: string;
  ProblemCode?: string;
}
