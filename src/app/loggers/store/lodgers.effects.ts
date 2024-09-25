import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, iif, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectLodgers } from "./lodgers.selectors";
import { LodgersService } from "../../core/services/lodgers.service";

@Injectable()
export class LodgersEffects {

  constructor(private actions$: Actions, private lodgerService: LodgersService, private store: Store) { }

  loadLodgers$ = createEffect(() => this.actions$.pipe(
    ofType('[Lodgers] Load Lodgers'),
    withLatestFrom(this.store.select(selectLodgers)),
    map(([_, lodgers]) => lodgers),
    switchMap(actualLodgers => {
      if (actualLodgers && actualLodgers.length > 0) {
        return of({ type: '[Lodgers] Load Lodgers Success', lodgers: actualLodgers });
      } else {
        return this.lodgerService.getLodgers().pipe(
          map(lodgers => ({ type: '[Lodgers] Load Lodgers Success', lodgers })),
          catchError(() => of({ type: '[Lodgers] Load Lodgers Failure' })))
      }
    }
    )))

  addLodger$ = createEffect(() => this.actions$.pipe(
    ofType('[Lodgers] Add Lodger'),
    switchMap(({ Lodger }) => this.lodgerService.createLodger(Lodger).pipe(
      map( data => ({ type: '[Lodgers] Add Lodger Success', lodger: (data as any).data })),
      catchError(() => of({ type: '[Lodgers] Load Lodgers Failure' }))
    ))
  ))

  removeLodger$ = createEffect(() => this.actions$.pipe(
    ofType('[Lodgers] Delete Lodger'),
    switchMap(data => this.lodgerService.deleteLodger((data as any).LodgerId).pipe(
      map( data => ({ type: '[Lodgers] Delete Lodger Success', lodgerId: data.id })),
      catchError(() => of({ type: '[Lodgers] Delete Lodger Failure' }))
    ))
  ))

  toogleCreateLodgerModal$ = createEffect(() => this.actions$.pipe(
    ofType('[Lodgers] Toogle Create Lodger Modal'),
    map(({ visible }) => ({ type: '[Lodgers] Toogle Create Lodger Modal Success', visible })),
    catchError(() => of({ type: '[Lodgers] Toogle Create Lodger Modal Failure' }))
  ))

}
