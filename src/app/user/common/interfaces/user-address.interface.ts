export interface AddressPart {
    name: string;
}

export interface UserAddress {
    _id: string;
    firstName: string;
    lastName: string;
    cellNumber: string;
    isBusiness: boolean;
    isResidential: boolean;
    streetAddress: string;
    businessName: string;
    vatNumber: number;
    complexBuilding: string;
    country_id: string;
    country: AddressPart;
    state_id: string;
    state: AddressPart;
    city_id: string;
    city: AddressPart;
    suburb_id: string;
    suburb: AddressPart;
    postalCode: string;
    isBillingDefault: boolean;
    isDeliveryDefault: boolean;
    isActiveInd: boolean;
    dateCreated: Date;
}
