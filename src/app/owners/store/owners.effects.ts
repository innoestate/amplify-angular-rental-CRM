import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { EstatesService } from "../../core/services/estates.service";
import { OwnersService } from "../../core/services/owners.service";

@Injectable()
export class OwnersEffects {

    constructor(private actions$: Actions, private ownerService: OwnersService) {}

    loadOwners$ = createEffect(() => this.actions$.pipe(
        ofType('[Owners] Load Owners'),
        switchMap(() => this.ownerService.getOwners(1).pipe(
            map(owners => ({ type: '[Owners] Load Owners Success', owners })),
            catchError(() => of({ type: '[Owners] Load Owners Failure' })))
    )))

}