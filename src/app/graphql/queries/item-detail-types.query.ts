import gql from "graphql-tag";

export const itemDetailTypes = gql`query {
    ItemDetailTypes(limit: 0) {
        _id
        description
        itemDetailTypeNo
        valueUnit
        allowSingleValueOnly
        createdByUserId
        valueType
        max
        sortFilterValuesByCount
        itemDetailTypeValues{
            _id
            description
            itemDetailType_id
            sortRanking
            status
        }
    }
}`;
