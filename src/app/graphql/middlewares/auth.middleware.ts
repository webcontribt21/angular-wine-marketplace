import {ApolloLink} from 'apollo-link';
import {HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const authMiddleware = new ApolloLink((operation, forward) => {
  let headers = new HttpHeaders().set(
    'x-shop-token',
    environment.shopToken
  );

  const token = localStorage.getItem('token');
  if (token) {
    headers = headers.set(
      'x-access-token',
      token
    );
  }

  operation.setContext({
    headers
  });

  return forward(operation);
});
