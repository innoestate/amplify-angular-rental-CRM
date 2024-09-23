import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import { EstatesService } from "../../core/services/estates.service";

@Injectable()
export class EstatesEffects {

    constructor(private actions$: Actions, private estatesService: EstatesService) {}

    loadEstates$ = createEffect(() => this.actions$.pipe(
        ofType('[Estates] Load Estates'),
        switchMap(() => this.estatesService.getEstates(1).pipe(
            map(estates => ({ type: '[Estates] Load Estates Success', estates })),
            catchError(() => of({ type: '[Estates] Load Estates Failure' })))
    )))

}