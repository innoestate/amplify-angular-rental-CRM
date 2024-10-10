import { createFeatureSelector, createSelector } from "@ngrx/store";
import { formatEstate } from "../utils/estates.utils";
import { State } from "./owners.reducers";
import { formatObjectsAddress } from "../utils/global.utils";
import { Owner } from "../models/owner.model";


export const ownersSelector =  createFeatureSelector<State>('owners');

export const selectOwners = createSelector(
    ownersSelector,
    (state) => (formatObjectsAddress(state.owners) as Owner[])
)

export const loadingOwners = createSelector(
    ownersSelector,
    (state) => state.loading
)

export const createOwnerModalVisible = createSelector(
    ownersSelector,
    (state) => state.createOwnerModalVisible
)
