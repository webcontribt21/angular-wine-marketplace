import gql from 'graphql-tag';

export const userQuery = gql`
    query user($id: ID!) {
        User(_id: $id) {
            _id
            shop_id
            name
            email
            password
            status
            userTypeNo
            dateCreated
        }
    }
`;

export const userAddressQuery = gql`
    query userAddress($id: ID!) {
        UserAddress(_id: $id) {
          _id
          user_id
          isDefault
          isBusiness
          isResidential
          isBillingDefault
          isDeliveryDefault
          streetAddress
          suburb_id
          suburb {
            name
          }
          city_id
          city {
            name
          }
          state_id
          state {
            name
          }
          country_id
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
`;

export const userAddressesQuery = gql`
    query userAddresses {
        UserAddresses(limit: 0) {
          _id
          user_id
          isDefault
          isBusiness
          isResidential
          isBillingDefault
          isDeliveryDefault
          streetAddress
          suburb_id
          suburb {
            name
          }
          city_id
          city {
            name
          }
          state_id
          state {
            name
          }
          country_id
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
`;

export const userCardsQuery = gql`
    query {
      PaymentCards(limit: 0) {
        _id
        from_user_id
        message
        dateCreated
        description
        cardName
        default
        cardNumberLastDigits
        expiryDate
        registration_id
      }
    }
`;
