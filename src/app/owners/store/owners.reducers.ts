import { createReducer, on } from "@ngrx/store";
import { Owner } from "../../core/models/owner.model";
import { loadOwners, loadOwnersFailure, loadOwnersSuccess } from "./owners.actions";

export interface State {
    owners: Owner[];
    loading: boolean;
}

export const initialState: State = {
    owners: [],
    loading: false
};

export const ownersReducer = createReducer(
    initialState,
    on(loadOwners, (state, data) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadOwnersSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            owners: data.owners
        }
    }),
    on(loadOwnersFailure, (state, error) => {
        return {
            ...state,
            loading: false
        }
    })
)