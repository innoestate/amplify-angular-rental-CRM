import { createAction, props } from "@ngrx/store";

export const loadEstates = createAction('[Estates] Load Estates', props<{ userId: number }>());
export const loadEstatesSuccess = createAction('[Estates] Load Estates Success', props<{ estates: any[] }>());
export const loadEstatesFailure = createAction('[Estates] Load Estates Failure', props<{ error: any }>());