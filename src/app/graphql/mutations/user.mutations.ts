import gql from 'graphql-tag';

export const createUserAddressQuery = gql`
  mutation createUserAddress(
    $firstName : String!,
    $lastName: String!,
    $cellNumber: String!,
    $isBusiness: Boolean!,
    $isResidential: Boolean!,
    $streetAddress: String!,
    $country_id: String,
    $state_id: String,
    $city_id: String,
    $suburb_id: String,
    $businessName: String,
    $vatNumber: Int,
    $complexBuilding: String,
    $postalCode: String!
    ) {
    createUserAddress(
        userAddress: {
          firstName: $firstName,
          lastName: $lastName,
          cellNumber: $cellNumber,
          isBusiness: $isBusiness,
          isResidential: $isResidential,
          streetAddress: $streetAddress,
          businessName: $businessName,
          vatNumber: $vatNumber,
          complexBuilding: $complexBuilding,
          country_id: $country_id,
          state_id: $state_id,
          city_id: $city_id,
          suburb_id: $suburb_id,
          postalCode: $postalCode
        }
      )
    {
      _id
      firstName
      lastName
      cellNumber
      isBusiness
      isResidential
      streetAddress
      businessName
      vatNumber
      complexBuilding
      country_id
      state_id
      city_id
      suburb_id
      postalCode
      isBillingDefault
      isDeliveryDefault
      isActiveInd
      dateCreated
    }
  }
`;

export const editUserAddressQuery = gql`
  mutation editUserAddress(
    $_id: ID!,
    $firstName : String!,
    $lastName: String!,
    $cellNumber: String!,
    $isBusiness: Boolean!,
    $isResidential: Boolean!,
    $streetAddress: String!,
    $suburb_id: String,
    $city_id: String,
    $state_id: String,
    $country_id: String,
    $businessName: String,
    $vatNumber: Int,
    $complexBuilding: String,
    $postalCode: String!
    ) {
      editUserAddress(
        _id: $_id
        userAddress: {
          firstName: $firstName,
          lastName: $lastName,
          cellNumber: $cellNumber,
          isBusiness: $isBusiness,
          isResidential: $isResidential,
          streetAddress: $streetAddress,
          businessName: $businessName,
          vatNumber: $vatNumber,
          complexBuilding: $complexBuilding,
          country_id: $country_id,
          state_id: $state_id,
          city_id: $city_id,
          suburb_id: $suburb_id,
          postalCode: $postalCode
        }
      )
    {
      _id
      firstName
      lastName
      cellNumber
      isBusiness
      isResidential
      streetAddress
      businessName
      vatNumber
      complexBuilding
      country_id
      state_id
      city_id
      suburb_id
      postalCode
      isBillingDefault
      isDeliveryDefault
      isActiveInd
      dateCreated
    }
  }
`;

export const deleteUserAddressQuery = gql`
  mutation deleteUserAddress(
    $_id: ID!,
    ) {
      deleteUserAddress(
        _id: $_id
      )
      {
        _id
      }
  }
`;

export const editUserAddressBillingDefaultQuery = gql`
  mutation editUserAddress(
    $id: ID!,
    $fromid: ID!
  ) {
    editUserAddress(
      _id: $id
      userAddress: {
        isBillingDefault: true
      }
    )
    {
      _id
      isBillingDefault
    }
    editUserAddressFrom: editUserAddress(
      _id: $fromid
      userAddress: {
        isBillingDefault: false
      }
    )
    {
      _id
      isBillingDefault
    }
  }
`;

export const editUserAddressDeliveryDefaultQuery = gql`
  mutation editUserAddress(
    $id: ID!,
    $fromid: ID!
  ) {
    editUserAddress(
      _id: $id
      userAddress: {
        isDeliveryDefault: true
      }
    )
    {
      _id
      isDeliveryDefault
    }
    editUserAddressFrom: editUserAddress(
      _id: $fromid
      userAddress: {
        isDeliveryDefault: false
      }
    )
    {
      _id
      isDeliveryDefault
    }
  }
`;

