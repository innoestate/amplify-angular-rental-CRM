import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, iif, map, of, switchMap, withLatestFrom } from "rxjs";
import { OwnersService } from "../../core/services/owners.service";
import { Store } from "@ngrx/store";
import { selectOwners } from "./owners.selectors";

@Injectable()
export class OwnersEffects {

  constructor(private actions$: Actions, private ownerService: OwnersService, private store: Store) { }

  loadOwners$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Load Owners'),
    withLatestFrom(this.store.select(selectOwners)),
    map(([_, owners]) => owners),
    switchMap( actualOwners => {
      if( actualOwners && actualOwners.length > 0){
        return of({ type: '[Owners] Load Owners Success', owners: actualOwners });
      }else{
        return this.ownerService.getOwners().pipe(
          map(owners => ({ type: '[Owners] Load Owners Success', owners })),
          catchError(() => of({ type: '[Owners] Load Owners Failure' })))
      }
    }
    )))

  addOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Add Owner'),
    switchMap(({ owner }) => this.ownerService.createOwner(owner).pipe(
      map(() => ({ type: '[Owners] Add Owner Success', owner })),
      catchError(() => of({ type: '[Owners] Load Owners Failure' }))
    ))
  ))

  removeOwner$ = createEffect(() => this.actions$.pipe(
    ofType('[Owners] Delete Owner'),
    switchMap(({ owner }) => this.ownerService.deleteOwner(owner).pipe(
      map(() => ({ type: '[Owners] Delete Owner Success' })),
      catchError(() => of({ type: '[Owners] Delete Owner Failure' }))
    ))
  ))

}
