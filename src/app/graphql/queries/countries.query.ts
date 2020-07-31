import gql from 'graphql-tag';

export const countriesGQL = gql`query {
    Countries(limit: 0) {
        _id
        name
        shortName
        states {
            name
            country_id
            cities {
                name
                state_id
                country_id
                suburbs {
                    name
                    country_id
                    city_id
                    state_id
                }
            }
        }
    }
}`;
