import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./lodgers.reducers";


export const lodgersSelector =  createFeatureSelector<State>('lodgers');

export const selectLodgers = createSelector(
    lodgersSelector,
    (state) => state.lodgers
)

export const loadingLodgers = createSelector(
    lodgersSelector,
    (state) => state.loading
)

export const createLodgerModalVisible = createSelector(
    lodgersSelector,
    (state) => state.createLodgerModalVisible
)
