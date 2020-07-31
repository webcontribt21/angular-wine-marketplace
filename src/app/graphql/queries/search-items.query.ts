import gql from 'graphql-tag';

export const searchItems = gql`
    query searchItems($query: String!, $limit: Int, $page: Int, $filters: [Filter], $sort: String) {
        searchItems(query: $query, limit: $limit, page: $page, filters: $filters, sort: $sort) {
            page {
                current
                total_pages
                total_results
                size
            },
            facets {
                name
                value {
                    type
                    data {
                    value
                    count
                    }
                }
            },
            items {
                _id
                name
                description
                referenceCode
                user_id
                supplier_id
                brand_id
                brand{
                  name
                }
                highLevelType_key
                country_id
                last_modified
                schedule_date
                in_review
                incomplete
                archived
                is_new
                published
                country {
                    name
                    shortName
                }
                itemImages {
                    _id
                    item_id
                    remote_id
                    remotePath
                    imageUrl: imageUrl_x240
                }
                suppliers {
                    _id
                    item_id
                    soldInMultiplesOf
                    stockQty
                    price
                    discountedPrice
                    usedOrNew
                    condition
                    sku
                    activeStatusNo
                    supplier_id
                }
                itemDetails {
                  itemDetailTypeNo
                  many
                  value
                  comment
                  type {
                    description
                  }
                  valueFromType {
                    description
                    imageUrl
                  }
                }
            }
        }
    }
`;


