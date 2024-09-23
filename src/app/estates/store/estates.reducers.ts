import { createReducer, on } from "@ngrx/store";
import { Estate } from "../../models/estate.model";
import { loadEstates, loadEstatesFailure, loadEstatesSuccess } from "./estates.actions";

export interface State {
    estates: Estate[];
    loading: boolean;
}

export const initialState: State = {
    estates: [],
    loading: false
};

export const estatesReducer = createReducer(
    initialState,
    on(loadEstates, (state, data) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadEstatesSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            estates: data.estates
        }
    }),
    on(loadEstatesFailure, (state, error) => {
        return {
            ...state,
            loading: false
        }
    })
)