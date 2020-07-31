import gql from 'graphql-tag';

export const registrationGQL = gql`
  mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userTypeNo: Int!) {
    Register(auth: { firstName: $firstName, lastName: $lastName, email: $email, password: $password, userTypeNo: $userTypeNo }) {
      token {
        token
      }
    }
  }
`;
