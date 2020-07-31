import gql from 'graphql-tag';

export const refreshTokenGQL = gql`
  mutation Renew {
      Renew {
          token
      }
  }
`;
