import gql from 'graphql-tag';

export const vendorFiltersGQL = gql`query {
    Suppliers (isActiveInd: true, limit: 0) {
        _id
        name
    }
}`;

export const dataGQL = gql`query {
	ShopByToken {
        _id
        name
        shopToken
        shopNo
        description
        activeStatus
        dateCreated
        dateLastUpdated
        imageName
        imageUrl
        imageEtag
        imageKey
        emailAddress
        liquorLicence
        commissionPercentage
        telNumber
        seoDescription
        campaignMonitorCode
        googleAnlyticsCode
        wineClubRuleDuration
        wineClubRuleBottles
        wineClubRuleOrderMinTotal
        wineClubRuleFreeShippingAmount
        wineClubRuleDiscountPercentage
        wineClubRuleBottlesRetainer
        wineClubRuleOrderMinTotalRetainer
        wineClubRuleTelNumber
        wineClubRuleEmailAddress
        wineClubRuleDescription
        prestashop_id
        freeShipping
        freeShippingPerShipment
        deliveryFeePerShipment
        estimatedDeliveryDays
    }

    Countries(limit: 0, sort: "{ name }") {
        _id
        name
        shortName
        states {
            _id
            name
            country_id
            cities {
                _id
                name
                country_id
                state_id
                suburbs {
                    _id
                    name
                    country_id
                    state_id
                    city_id
                }
            }
        }
    }
    Brands(limit: 0, sort: "{ name }") {
        _id
        name
    }

    searchItems(query: "", limit: 0, filters: [{name: "price_zar_stock", value: ["{\\"from\\":1}"]}]) {
        facets {
            name
            value {
                type
                data {
                    value
                    count
                }
            }
        }
    }

    ItemDetailTypes(limit: 0) {
        _id
        description
        itemDetailTypeNo
        sortFilterValuesByCount
        itemDetailTypeValues{
            _id
            description
            itemDetailType_id
            routeKey
        }
    }
}`;
