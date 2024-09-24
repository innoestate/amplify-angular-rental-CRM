import { createAction, props } from "@ngrx/store";
import { Owner } from "../../core/models/owner.model";

export const loadOwners = createAction('[Owners] Load Owners');
export const loadOwnersSuccess = createAction('[Owners] Load Owners Success', props<{ owners: any[] }>());
export const loadOwnersFailure = createAction('[Owners] Load Owners Failure', props<{ error: any }>());
export const addOwner = createAction('[Owners] Add Owner', props<{ owner: Owner }>());
export const addOwnerSuccess = createAction('[Owners] Add Owner Success', props<{ owner: any }>());
export const addOwnerFailure = createAction('[Owners] Add Owner Failure', props<{ error: any }>());
export const deleteOwner = createAction('[Owners] Delete Owner', props<{ owner: Owner }>());
export const deleteOwnerSuccess = createAction('[Owners] Delete Owner Success', props<{ owner: any }>());
export const deleteOwnerFailure = createAction('[Owners] Delete Owner Failure', props<{ error: any }>());
