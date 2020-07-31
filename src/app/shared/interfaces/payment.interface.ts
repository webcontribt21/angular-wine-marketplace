import { User } from './order.interface';
import { PaymentGatewayMethodNumber } from '../enums/payment-gateway-method.enum';
import { PaymentCurrencyNumber } from '../enums/payment-currency.enum';
import { PaymentMethodNumber } from '../enums/payment-method.enum';
import { PaymentGatewayNumber } from '../enums/payment-gateway.enum';
import { PaymentStatusNumber } from '../enums/payment-status.enum';

export interface PendingPaymentStatus {
  _id: string;
  paymentGatewayMethod: PaymentGatewayMethod[];
  paymentGatewayMethodNumber: PaymentGatewayMethodNumber;
  paymentStatus: PaymentStatus[];
}

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface PayStatus {
  message: string;
  url: string;
  PaReq: string;
  TermUrl: string;
  MD: string;
  connector: string;
}

export interface Payment {
  _id: string;
  description: string;
  from_user_id: string;
  to_order_id: string;
  to_shop_id: string;
  paymentGatewayMethodNumber: PaymentGatewayMethodNumber;
  dateCompleted: string;
  dateCreated: string;
  paymentCurrencyNumber: PaymentCurrencyNumber;
  amount_gross: number;
  amount_fees: number;
  amount_net: number;
  paymentStatusNumber: PaymentStatusNumber;
  remote_payment_id: string;
  remote_transaction_log: string;
  paymentGatewayMethod: PaymentGatewayMethod[];
  paymentStatus: PaymentStatus[];
  paymentCurrency: PaymentCurrency[];
}

export interface PaymentStatus {
  _id: string;
  description: string;
  dateCreated: string;
  datePatched: string;
  status: boolean;
  paymentStatusNumber: PaymentStatusNumber;
  userResponsibleForLatestPatchId: string;
  user: User;
}

export interface PaymentCurrency {
  _id: string;
  description: string;
  dateCreated: string;
  datePatched: string;
  status: boolean;
  paymentCurrencyNumber: PaymentCurrencyNumber;
  userResponsibleForLatestPatchId: string;
}

export interface PaymentGatewayMethod {
  _id: string;
  paymentGatewayNumber: PaymentGatewayNumber;
  paymentMethodNumber: PaymentMethodNumber;
  description: string;
  dateCreated: string;
  datePatched: string;
  status: boolean;
  paymentGatewayMethodNumber: PaymentGatewayMethodNumber;
  userResponsibleForLatestPatchId: string;
  paymentGateway: PaymentGateway[];
  paymentMethod: PaymentMethod[];
}

export interface PaymentGateway {
  _id: string;
  description: string;
  dateCreated: string;
  datePatched: string;
  status: boolean;
  paymentGatewayNumber: PaymentGatewayNumber;
  userResponsibleForLatestPatchId: string;
}

export interface PaymentMethod {
  _id: string;
  description: string;
  dateCreated: string;
  datePatched: string;
  status: boolean;
  paymentMethodNumber: PaymentMethodNumber;
  userResponsibleForLatestPatchId: string;
}
