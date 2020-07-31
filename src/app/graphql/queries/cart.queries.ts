import gql from 'graphql-tag';

export const cartSummaryQuery = gql`
  query cartSummary($id: ID!, $tempCartUserToken: String) {
    CartSummary(_id: $id, tempCartUserToken: $tempCartUserToken) {
      subTotalAmount
      deliveryTotalAmount
      orderTotalAmount
      amountToFreeDisplay
      amountToFree
      outstandingAmount
      voucher {
        code
        discountPercent
        discountAmount
        orderDiscountAmount
      }
      shipments {
        _id
        name
        total
        deliveryFee
        shippingFrom
        estimatedDeliveryDate
        shipmentTotalAmount
        amountToFree
        amountToFreeDisplay
        cartItems {
          _id
          cartItemPrice
          cartItemPriceTotal
          cartItemSoldInQuantitiesOf
          stockQty
          quantity
          item {
            _id
            name
            brand {
              name
            }
            itemImages {
              remotePath
              imageUrl: imageUrl_x240
            }
            itemDetails {
              type {
                itemDetailTypeNo
              }
              valueFromType {
                description
              }
            }
          }
        }
      }
    }
  }
`;

export const orderSummaryQuery = gql`
  query orderSummary($id: ID!) {
    OrderSummary(_id: $id) {
      order_id
      orderNumber
      orderReference
      estimatedDeliveryDateFrom
      estimatedDeliveryDateTo
      subTotalAmount
      orderTotalAmount
      outstandingAmount
      deliveryTotalAmount
      dateCreated
      orderPayment {
        _id
        description
        from_user_id
        to_order_id
        to_shop_id
        paymentGatewayMethodNumber
        dateCompleted
        dateCreated
        paymentCurrencyNumber
        amount_gross
        amount_fees
        amount_net
        paymentStatusNumber
        paymentStatus {
          description
        }
        remote_payment_id
        remote_transaction_log
        paymentGatewayMethod {
          _id
          paymentGatewayNumber
          paymentMethodNumber
          description
          dateCreated
          datePatched
          status
          paymentGatewayMethodNumber
          userResponsibleForLatestPatchId
          paymentGateway {
            description
            _id
            dateCreated
            status
            datePatched
            paymentGatewayNumber
            userResponsibleForLatestPatchId
          }
          paymentMethod {
            _id
            description
            dateCreated
            datePatched
            status
            paymentMethodNumber
            userResponsibleForLatestPatchId
          }
        }
      }
      shipments {
        _id
        shippingFrom
        value
        courierDeliveryCharge
        estimatedDeliveryDate
        orderCourierNo
        courierName
        trackingNumber
        orderShipmentStatusNo
        orderShipmentStatusDescription
        shipmentItems {
          _id
          order_id
          item_id
          quantity
          dateCreated
          price
          item {
            _id
            name
            description
            country {
              name
            }
            brand {
              name
            }
            itemDetails {
              itemDetailTypeNo
              _id
              value
            }
            itemImages {
              imageUrl: imageUrl_x240
            }
            suppliers {
              supplier {
                name
              }
            }
          }
        }
      }
      shippingAddress {
        _id
        order_id
        isDefault
        isBusiness
        isResidential
        isBillingDefault
        isDeliveryDefault
        streetAddress
        suburb {
          name
        }
        city {
          name
        }
        state {
          name
        }
        country {
          name
        }
        postalCode
        isActiveInd
        firstName
        lastName
        cellNumber
        complexBuilding
        businessName
        vatNumber
        dateCreated
      }
      billingAddress {
        _id
        order_id
        isDefault
        isBusiness
        isResidential
        isBillingDefault
        isDeliveryDefault
        streetAddress
        suburb {
          name
        }
        city {
          name
        }
        state {
          name
        }
        country {
          name
        }
        postalCode
        isActiveInd
        firstName
        lastName
        cellNumber
        complexBuilding
        businessName
        vatNumber
        dateCreated
      }
    }
  }
`;

export const cartsQuery = gql`
  query carts($tempCartUserToken: String!) {
    Carts(cart: { tempCartUserToken: $tempCartUserToken, cartStatusNo: 1 }) {
      _id
    }
  }
`;

export const cartOnLoginQuery = gql`
  query cartOnLogin($tempCartUserToken: String) {
    CartOnLogin(cart: { tempCartUserToken: $tempCartUserToken }) {
      _id
      tempCartUserToken
    }
  }
`;

export const paymentStatusQuery = gql`
  query paymentStatus($paymentId: ID!) {
    Payment(_id: $paymentId) {
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
