import gql from 'graphql-tag';

export const createCartItemQuery = gql`
mutation createCartItem($tempCartUserToken: String!, $cartId: String, $itemId: String, $itemSupplierId: String, $quantity: Int) {
  createCartItem(
    cartItem: {
      tempCartUserToken: $tempCartUserToken,
      cart_id: $cartId,
      item_id: $itemId,
      itemSupplier_id: $itemSupplierId,
      quantity: $quantity
    })
  {
    _id
    quantity
	}
}
`;

export const editCartItemQuantityQuery = gql`
mutation editCartItem($tempCartUserToken: String!, $cartId: String, $cartItemId: ID!, $quantity: Int) {
  editCartItem(
    _id: $cartItemId,
    cartItem: {
      cart_id: $cartId,
      tempCartUserToken: $tempCartUserToken,
      quantity: $quantity
    })
  {
    _id
    quantity
	}
}
`;

export const deleteCartItemQuery = gql`
mutation deleteCartItem($tempCartUserToken: String!, $cartId: String, $cartItemId: ID!) {
  deleteCartItem(
    _id: $cartItemId,
    cartItem: {
      tempCartUserToken: $tempCartUserToken
      cart_id: $cartId
    }
  )
  {
  	_id
	}
}
`;

// export const deleteAllCartItemsQuery = gql`
// mutation deleteCartItem($cartId: ID!) {
//   deleteCartItem(
//     _id: $cartId
//   )
//   {
//   	_id
// 	}
// }
// `;
