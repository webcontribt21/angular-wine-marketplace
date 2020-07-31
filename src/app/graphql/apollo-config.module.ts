import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Apollo, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {GRAPHQL_CONFIG} from "../../config";
import {authMiddleware} from './middlewares';
import {from} from 'apollo-link';
import {AuthApiService} from '../auth/services/auth.api.service';
import {onError} from 'apollo-link-error';
import {Errors} from '../auth/common/enums';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../@store/reducers/reducers';
import * as authActions from '../@store/auth/auth.actions';

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
  ],
  declarations: [],
})

export class ApolloConfigModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private router: Router,
    private store$: Store<RootState>
  ) {

    const unauthorised = () => {
      this.store$.dispatch(authActions.logout());
      this.router.navigate(['/auth/sign_in']);
    };

    const http = httpLink.create({
      ...GRAPHQL_CONFIG,
    });

    const errorMiddleware = onError(({ graphQLErrors, networkError }) => {

      if (graphQLErrors) {
        graphQLErrors.map( ({ statusCode, error } : any) => {
          switch (statusCode) {
            case 500:
              if (error.message === Errors.FAILED_AUTH_TOKEN) {
                console.log(Errors.FAILED_AUTH_TOKEN);
                unauthorised();
              }
              break;
            case 403:
              if (error.message === Errors.NO_TOKEN) {
                console.log(Errors.NO_TOKEN);
                unauthorised();
              }
            default:
              break;
          }
        });
      }
    });

    apollo.create({
      link: from([authMiddleware, errorMiddleware, http]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
    });
  }
}
