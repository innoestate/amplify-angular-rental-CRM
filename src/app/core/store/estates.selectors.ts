import { createFeatureSelector, createSelector } from "@ngrx/store";
import { formatEstate } from "../utils/estates.utils";
import { State } from "./estates.reducers";


export const estatesSelector =  createFeatureSelector<State>('estates');

export const selectEstates = createSelector(
    estatesSelector,
    (state) => state.estates.map(estate => formatEstate(estate))
)

export const loadingEstates = createSelector(
    estatesSelector,
    (state) => state.loading
)

export const createEstateModalVisible = createSelector(
    estatesSelector,
    (state) => state.createEstateModalVisible
);

export const setLodgerModalVisible = createSelector(
  estatesSelector,
  (state) => state.setLodgerModalVisible
);
