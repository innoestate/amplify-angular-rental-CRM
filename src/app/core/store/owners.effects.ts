import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, iif, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { OwnersService } from "../services/owners.service";
import { Store } from "@ngrx/store";
import { selectOwners } from "./owners.selectors";

@Injectable()
export class OwnersEffects {

  constructor(private actions$: Actions, private ownerService: OwnersService, private store: Store) { }

  loadOwners$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Load Owners'),
    withLatestFrom(this.store.select(selectOwners)),
    map(([_, owners]) => owners),
    switchMap(actualOwners => {
      if (actualOwners && actualOwners.length > 0) {
        return of({ type: '[Owners] Load Owners Success', owners: actualOwners });
      } else {
        return this.ownerService.getOwners().pipe(
          map(owners => ({ type: '[Owners] Load Owners Success', owners })),
          catchError(() => of({ type: '[Owners] Load Owners Failure' })))
      }
    }
    )))

  addOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Add Owner'),
    switchMap(({ owner }) => this.ownerService.createOwner(owner).pipe(
      map( data => ({ type: '[Owners] Add Owner Success', owner: (data as any).data })),
      catchError(() => of({ type: '[Owners] Load Owners Failure' }))
    ))
  ))

  removeOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Delete Owner'),
    switchMap(data => this.ownerService.deleteOwner((data as any).ownerId).pipe(
      map( data => ({ type: '[Owners] Delete Owner Success', ownerId: data.id })),
      catchError(() => of({ type: '[Owners] Delete Owner Failure' }))
    ))
  ))

  toogleCreateOwnerModal$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Toogle Create Owner Modal'),
    map(({ visible }) => ({ type: '[Owners] Toogle Create Owner Modal Success', visible })),
    catchError(() => of({ type: '[Owners] Toogle Create Owner Modal Failure' }))
  ))

}
