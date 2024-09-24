import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, map, of, switchMap, take, tap } from "rxjs";
import { EstatesService } from "../../core/services/estates.service";
import { Store } from "@ngrx/store";
import { ownersSelector } from "../../owners/store/owners.selectors";
import { formatEstates } from "../../core/utils/estates.utils";

@Injectable()
export class EstatesEffects {

    constructor(private actions$: Actions, private estatesService: EstatesService, private store: Store) {}

    loadEstates$ = createEffect(() => this.actions$.pipe(
        ofType('[Estates] Load Estates'),
        tap(() => this.store.dispatch({ type: '[Owners] Load Owners' })),
        switchMap(() => this.store.select(ownersSelector)),
        switchMap(data => combineLatest([of(data?.owners),this.estatesService.getEstates()]).pipe(
            map(([owners, estates]) => ({ type: '[Estates] Load Estates Success', estates: formatEstates(estates, owners) })),
            catchError(() => of({ type: '[Estates] Load Estates Failure' })))
    )))

    createEstate$ = createEffect(() => this.actions$.pipe(
        ofType('[Estates] Create Estate'),
        switchMap(({ estate }) => this.estatesService.createEstate(estate).pipe(
            map(() => ({ type: '[Estates] Create Estate Success', estate })),
            catchError(() => of({ type: '[Estates] Create Estate Failure' }))
        ))
    ))

    deleteEstate$ = createEffect(() => this.actions$.pipe(
        ofType('[Estates] Delete Estate'),
        switchMap(({ estate }) => this.estatesService.deleteEstate(estate).pipe(
            map(() => ({ type: '[Estates] Delete Estate Success', estate })),
            catchError(() => of({ type: '[Estates] Delete Estate Failure' }))
        ))
    ))

}
