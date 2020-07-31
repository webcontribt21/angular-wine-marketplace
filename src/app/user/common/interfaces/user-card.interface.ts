export interface UserCard {
  _id: string;
  from_user_id: string;
  message: string;
  dateCreated: Date;
  description: string;
  cardName: string;
  default: boolean;
  cardNumberLastDigits: string;
  expiryDate: string;
  registration_id: string;
}

export interface UserCardFull {
  cardName: string;
  cardNumber: string;
  expiryDateMonth: string;
  expiryDateYear: string;
  cvv: string;
  remember: boolean;
}
