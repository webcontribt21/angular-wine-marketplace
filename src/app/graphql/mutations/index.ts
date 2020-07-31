export { loginGQL } from './login.mutation';
export { registrationGQL } from './registration.mutation';
export { refreshTokenGQL } from './refreshToken.mutation';
export {
    createUserAddressQuery,
    editUserAddressQuery,
    editUserAddressBillingDefaultQuery,
    editUserAddressDeliveryDefaultQuery
} from './user.mutations';
export {
    createCartQuery,
    editCartToOrderQuery,
    createPaymentQuery,
    payQuery,
    applyVoucherQuery,
    removeVoucherQuery
} from './cart.mutations';
