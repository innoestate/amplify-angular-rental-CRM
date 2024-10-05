import { createAction, props } from "@ngrx/store";
import { Estate } from "../models/estate.model";

export const loadEstates = createAction('[Estates] Load Estates', props<{ userId: number }>());
export const loadEstatesSuccess = createAction('[Estates] Load Estates Success', props<{ estates: any[] }>());
export const loadEstatesFailure = createAction('[Estates] Load Estates Failure', props<{ error: any }>());

export const createEstate = createAction('[Estates] Create Estate', props<{ estate: any }>());
export const createEstateSuccess = createAction('[Estates] Create Estate Success', props<{ estate: any }>());
export const createEstateFailure = createAction('[Estates] Create Estate Failure', props<{ error: any }>());

export const deleteEstate = createAction('[Estates] Delete Estate');
export const deleteEstateSuccess = createAction('[Estates] Delete Estate Success', props<{ estate: Estate }>());
export const deleteEstateFailure = createAction('[Estates] Delete Estate Failure', props<{ error: any }>());

export const editEstate = createAction('[Estates] Edit Estate', props<{ estate: Estate }>());
export const editEstateSuccess = createAction('[Estates] Edit Estate Success', props<{ estate: Estate }>());
export const editEstateFailure = createAction('[Estates] Edit Estate Failure', props<{ error: any }>());

export const toogleCreateEstateModal = createAction('[Estates] Toogle Create Estate Modal', props<{ visible: boolean }>());
export const toogleCreateEstateModalSuccess = createAction('[Estates] Toogle Create Estate Modal Success', props<{ visible: boolean }>());
export const toogleCreateEstateModalFailure = createAction('[Estates] Toogle Create Estate Modal Failure', props<{ error: any }>());

export const toogleSetLodgerModal = createAction('[Estates] Toogle Set Lodger Modal', props<{ visible: boolean }>());
export const toogleSetLodgerModalSuccess = createAction('[Estates] Toogle Set Lodger Modal Success', props<{ visible: boolean }>());
export const toogleSetLodgerModalFailure = createAction('[Estates] Toogle Set Lodger Modal Failure', props<{ error: any }>());
