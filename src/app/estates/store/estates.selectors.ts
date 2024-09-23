import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./estates.reducers";
import { Estate } from "../../models/estate.model";


export const estatesSelector =  createFeatureSelector<State>('estates');

export const selectEstates = createSelector(
    estatesSelector,
    (state) => state.estates
)