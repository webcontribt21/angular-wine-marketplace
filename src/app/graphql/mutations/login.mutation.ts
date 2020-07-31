import gql from 'graphql-tag';

export const loginGQL = gql`
  mutation login($email: String!, $password: String!) {
     Login(email: $email, password: $password) {
         auth
         token {
             user_id
             token
         }
     } 
  }
`;
