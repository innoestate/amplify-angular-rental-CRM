import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./lodgers.reducers";
import { formatObjectsAddress } from "../../core/utils/global.utils";
import { Lodger } from "../../core/models/lodger.model";


export const lodgersSelector =  createFeatureSelector<State>('lodgers');

export const selectLodgers = createSelector(
    lodgersSelector,
    (state) => (formatObjectsAddress(state.lodgers) as Lodger[])
)

export const loadingLodgers = createSelector(
    lodgersSelector,
    (state) => state.loading
)

export const createLodgerModalVisible = createSelector(
    lodgersSelector,
    (state) => state.createLodgerModalVisible
)
