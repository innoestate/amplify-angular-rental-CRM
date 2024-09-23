import { createAction, props } from "@ngrx/store";

export const loadOwners = createAction('[Owners] Load Owners', props<{ userId: number }>());
export const loadOwnersSuccess = createAction('[Owners] Load Owners Success', props<{ owners: any[] }>());
export const loadOwnersFailure = createAction('[Owners] Load Owners Failure', props<{ error: any }>());