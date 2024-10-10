import { createAction, props } from "@ngrx/store";
import { Lodger } from "../models/lodger.model";

export const loadLodgers = createAction('[Lodgers] Load Lodgers');
export const loadLodgersSuccess = createAction('[Lodgers] Load Lodgers Success', props<{ lodgers: any[] }>());
export const loadLodgersFailure = createAction('[Lodgers] Load Lodgers Failure', props<{ error: any }>());

export const addLodger = createAction('[Lodgers] Add Lodger', props<{ Lodger: Lodger }>());
export const addLodgerSuccess = createAction('[Lodgers] Add Lodger Success', props<{ lodger: any }>());
export const addLodgerFailure = createAction('[Lodgers] Add Lodger Failure', props<{ error: any }>());

export const deleteLodger = createAction('[Lodgers] Delete Lodger', props<{ LodgerId: string }>());
export const deleteLodgerSuccess = createAction('[Lodgers] Delete Lodger Success', props<{ lodgerId: string }>());
export const deleteLodgerFailure = createAction('[Lodgers] Delete Lodger Failure', props<{ error: any }>());

export const updateLodgerEstate = createAction('[Lodgers] Update Lodger Estate', props<{ lodger: Lodger, lodgers: Lodger[] }>());
export const updateLodgersSuccess = createAction('[Lodgers] Update Lodgers Success', props<{ lodgers: Lodger[] }>());
export const updateLodgerFailure = createAction('[Lodgers] Update Lodgers Failure', props<{ error: any }>());

export const toogleCreateLodgerModal = createAction('[Lodgers] Toogle Create Lodger Modal', props<{ visible: any }>());
export const toogleCreateLodgerModalSuccess = createAction('[Lodgers] Toogle Create Lodger Modal Success');
export const toogleCreateLodgerModalFailure = createAction('[Lodgers] Toogle Create Lodger Modal Failure', props<{ error: any }>());
