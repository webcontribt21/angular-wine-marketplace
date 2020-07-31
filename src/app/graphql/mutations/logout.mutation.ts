import gql from 'graphql-tag';

export const logoutGQL = gql`
    mutation logout($token: String!) {
        Logout(token: $token) {
            auth
            message
        }
    }
`;
