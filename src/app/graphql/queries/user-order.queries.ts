import gql from 'graphql-tag';

export const ordersGQL = gql`
  query ordersGQL($query: String, $limit: Int, $skip: Int) {
    Orders(orderReference: $query, limit: $limit, skip: $skip, sort: "-orderNumber"){
      _id
      shop_id
      user_id
      dateCreated
      dateCompleted
      orderStatusNumber
      orderReference
      orderNumber
    }
  }
`;

export const orderSummaryGQL = gql`
  query orderSummaryGQL($id: ID!) {
    OrderSummary (_id: $id) {
      order_id
      orderNumber
      orderReference
      estimatedDeliveryDateFrom
      estimatedDeliveryDateTo
      subTotalAmount
      orderTotalAmount
      outstandingAmount
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
          quantity
          price
          item {
            country {
              name
            }
            name
            brand {
              name
            }
            itemDetails {
              itemDetailTypeNo
            }
            itemImages {
              imageUrl_x240
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
        suburb_id
        city_id
        state_id
        country_id
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
        suburb_id
        city_id
        state_id
        country_id
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

export const shipmentTrackingsGQL = gql`
  query shipmentTrackingsGQL($trackingNumber: [String]!) {
    TrackingAramex(numbers: $trackingNumber){
      errors {
        Message
        Code
      }
      results {
        key
        value {
          WaybillNumber
          UpdateCode
          UpdateDescription
          UpdateDateTime
          UpdateLocation
          Comments
          ProblemCode
        }
      }
    }
  }
`;
