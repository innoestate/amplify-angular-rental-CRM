import { createReducer, on } from "@ngrx/store";
import { Owner } from "../../core/models/owner.model";
import { addOwner, addOwnerFailure, addOwnerSuccess, deleteOwner, deleteOwnerFailure, deleteOwnerSuccess, loadOwners, loadOwnersFailure, loadOwnersSuccess } from "./owners.actions";

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
    }),
    on(addOwner, (state, data) => {
        return {
            ...state,
        }
    }),
    on(addOwnerSuccess, (state, data) => {
        return {
            ...state,
            owners: state.owners.concat(data.owner)
        }
    }),
    on(addOwnerFailure, (state, error) => {
        return {
            ...state,
        }
    }),
    on(deleteOwner, (state, data) => {
        return {
            ...state,
            owners: state.owners.filter(owner => owner.id !== data.owner.id),
        }
    }),
    on(deleteOwnerSuccess, (state, data) => {
        return {
            ...state,
        }
    }),
    on(deleteOwnerFailure, (state, error) => {
        return {
            ...state,
        }
    })
)
