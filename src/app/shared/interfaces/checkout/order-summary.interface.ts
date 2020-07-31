import { Payment } from '../payment.interface';

export interface OtpCheckoutMode {
  otpRequired: boolean;
  url: string;
  PaReq: string;
  TermUrl: string;
  MD: string;
  connector: string;
}

export interface Suburb {
  _id: string;
  name: string;
}

export interface Country {
  _id: string;
  name: string;
}

export interface State {
  _id: string;
  name: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface ShippingAddress {
  _id: string;
  firstName: string;
  lastName: string;
  isBusiness: boolean;
  isResidential: boolean;
  streetAddress: string;
  suburb: Suburb;
  country: Country;
  state: State;
  city: City;
  postalCode: string;
  businessName: string;
  vatNumber?: any;
  complexBuilding: string;
  cellNumber: string;
}

export interface BillingAddress {
  _id: string;
  firstName: string;
  lastName: string;
  isBusiness: boolean;
  isResidential: boolean;
  streetAddress: string;
  suburb: Suburb;
  country: Country;
  state: State;
  city: City;
  postalCode: string;
  businessName: string;
  vatNumber?: any;
  complexBuilding: string;
  cellNumber: string;
}

export interface Shipments {
  _id: string;
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

export interface OrderSummary {
  order_id: string;
  orderNumber: string;
  estimatedDeliveryDateFrom?: any;
  estimatedDeliveryDateTo?: any;
  subTotalAmount: number;
  orderTotalAmount: number;
  outstandingAmount: number;
  deliveryTotalAmount: number;
  dateCreated: Date;
  orderPayment: Payment;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  shipments: Shipments;
}
