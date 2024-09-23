import { createFeatureSelector, createSelector } from "@ngrx/store";
import { formatEstate } from "../../core/utils/estates.utils";
import { State } from "./owners.reducers";


export const ownersSelector =  createFeatureSelector<State>('owners');

export const selectOwners = createSelector(
    ownersSelector,
    (state) => state.owners
)

export const loadingOwners = createSelector(
    ownersSelector,
    (state) => state.loading
)