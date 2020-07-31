import { PaymentMethodNumber } from '../enums/payment-method.enum';
import { PaymentGatewayNumber } from '../enums/payment-gateway.enum';
import { PaymentGatewayMethodNumber } from '../enums/payment-gateway-method.enum';

export function getPaymentMethods() {
    const availableMethods = [PaymentMethodNumber.CreditCard, PaymentMethodNumber.ManualEFT];
    return availableMethods.map(m => ({
        value: m,
        label: getPaymentMethodDescr(m)
    }));
}

export function getPaymentMethodDescr(paymentMethodNumber: PaymentMethodNumber): string | null {
    switch (paymentMethodNumber) {
        case PaymentMethodNumber.CreditCard:
            return 'Credit & Debit Card';
        case PaymentMethodNumber.InstantEFT:
            return 'Instant EFT';
        case PaymentMethodNumber.SnapScan:
            return 'SnapScan';
        case PaymentMethodNumber.ManualEFT:
          return 'Manual EFT';
    }
    return null;
}

export function getPaymentGatewayNumber(paymentMethodNumber: PaymentMethodNumber): PaymentGatewayNumber | null {
    switch (paymentMethodNumber) {
        case PaymentMethodNumber.CreditCard:
        case PaymentMethodNumber.InstantEFT:
            return PaymentGatewayNumber.Peach;
        case PaymentMethodNumber.ManualEFT:
            return PaymentGatewayNumber.ManualEFT;
    }
    return null;
}

export function getPaymentGatewayMethodNumber(paymentMethodNumber: PaymentMethodNumber): PaymentGatewayMethodNumber | null {
    switch (paymentMethodNumber) {
        case PaymentMethodNumber.CreditCard:
            return PaymentGatewayMethodNumber.PeachCreditCard;
        case PaymentMethodNumber.InstantEFT:
            return PaymentGatewayMethodNumber.PeachInstantEFT;
        // case PaymentMethodNumber.SnapScan:
        //     return null;
        case PaymentMethodNumber.ManualEFT:
            return PaymentGatewayMethodNumber.ManualEFT;
    }
    return null;
}
