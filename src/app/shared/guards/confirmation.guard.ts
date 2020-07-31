import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanDeactivateComponent } from '../interfaces/canDeactivateComponent.interface';

@Injectable()
export class ConfirmationGuard implements CanDeactivate<CanDeactivateComponent> {

    //constructor(private store$: Store<RootState>) { }

    canDeactivate(
        compponent: CanDeactivateComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean> {
        return compponent.confirm(currentRoute, currentState, nextState);
    }
}
