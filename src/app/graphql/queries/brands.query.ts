import gql from "graphql-tag";

export const brandsQuery = gql`query {
    Brands(limit: 0) {
        name
        description
        imageName
        imageUrl
        imageEtag
        imageKey
        imageBanner
        activeStatus
        dateCreated
        country_id
        address
        region_id
        prestashop_id
    }
}`;
