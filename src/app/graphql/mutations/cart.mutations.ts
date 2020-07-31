import gql from 'graphql-tag';

export const createCartQuery = gql`
  mutation createCart($tempCartUserToken: String) {
    createCart(
        cart: {
          tempCartUserToken: $tempCartUserToken
        }
    )
    {
      _id
      tempCartUserToken
    }
  }
`;

export const editCartToOrderQuery = gql`
mutation editCartToOrder(
  $cartId: ID!,
  $billingAddressId: String,
  $shippingAddressId: String,
  $additionalInformation: String,
  $isGift:Boolean,
  $giftSender:String,
  $giftRecipient:String,
  $giftMessage:String) {
  editCartToOrder(
    _id: $cartId,
    billingAddressId:$billingAddressId,
    shippingAddressId:$shippingAddressId,
    additionalInformation:$additionalInformation,
    isGift: $isGift,
    giftSender: $giftSender,
    giftRecipient: $giftRecipient,
    giftMessage: $giftMessage
  )
  {
    order_id
  }
}
`;

export const createPaymentQuery = gql`
mutation createPayment($orderId: String,
  $paymentGatewayMethodNumber: Int,
  $paymentGatewayNumber: Int,
  $paymentStatusNumber: Int,
  $paymentCurrencyNumber: Int,
  $amount_gross: Int) {
  createPayment(payment: {
    to_order_id: $orderId,
    paymentGatewayMethodNumber: $paymentGatewayMethodNumber,
    paymentGatewayNumber: $paymentGatewayNumber,
    paymentStatusNumber: $paymentStatusNumber,
    paymentCurrencyNumber: $paymentCurrencyNumber,
    amount_gross: $amount_gross
  }) {
    _id
    paymentGatewayNumber
    paymentGatewayMethodNumber
    paymentStatusNumber
    peach_url
	  peach_pareq
	  peach_term_url
	  peach_md
	  peach_connector
	  peach_payment_status_code
	  peach_payment_status_description
  }
}
`;

export const payQuery = gql`
  mutation pay($id: ID!, $cardNumber: String!, $cardHolder: String!, $expiryMonth: String!, $expiryYear: String!, $cvv: String!) {
    Pay(_id: $id, card:{number:$cardNumber, holder: $cardHolder, expiryMonth: $expiryMonth, expiryYear: $expiryYear, cvv: $cvv}){
      message
      url
      PaReq
      TermUrl
      MD
      connector
    }
  }
`;

export const applyVoucherQuery = gql`
  mutation editCart($cartId: ID!, $voucherCode: String) {
    editCart(_id: $cartId, cart: { voucherCode: $voucherCode }) {
      _id
      tempCartUserToken
      user_id
      shop_id
      dateCreated
      dateCompleted
      order_id
      cartStatusNo
      voucher_id
    }
  }
`;

export const removeVoucherQuery = gql`
  mutation editCart($cartId: ID!) {
    editCart(_id: $cartId, cart: { voucher_id: "" }) {
      _id
      tempCartUserToken
      user_id
      shop_id
      dateCreated
      dateCompleted
      order_id
      cartStatusNo
      voucher_id
    }
  }
`;
