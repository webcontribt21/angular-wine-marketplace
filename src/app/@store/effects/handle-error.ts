import {of} from 'rxjs';
import {ErrorResponse} from 'apollo-link-error';
import * as errorActions from '../errors';

export function handleError(responseError: ErrorResponse) {
    if (responseError.hasOwnProperty('graphQLErrors') && responseError.graphQLErrors.length) {
        return of([
            errorActions.setRequestErrors({errors: [...responseError.graphQLErrors]}),
        ]);
    }
}
