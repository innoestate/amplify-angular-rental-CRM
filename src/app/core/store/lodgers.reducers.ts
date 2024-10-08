import { createReducer, on } from "@ngrx/store";
import { addLodger, addLodgerFailure, addLodgerSuccess, deleteLodger, deleteLodgerFailure, deleteLodgerSuccess, loadLodgers, loadLodgersFailure, loadLodgersSuccess, toogleCreateLodgerModal, toogleCreateLodgerModalSuccess, updateLodgerEstate, updateLodgersSuccess } from "./lodgers.actions";
import { Lodger } from "../models/lodger.model";

export interface State {
    lodgers: Lodger[];
    createLodgerModalVisible: boolean;
    loading: boolean;
}

export const initialState: State = {
  lodgers: [],
    createLodgerModalVisible: false,
    loading: false
};

export const LodgersReducer = createReducer(
    initialState,
    on(loadLodgers, (state, data) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadLodgersSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            lodgers: data.lodgers
        }
    }),
    on(loadLodgersFailure, (state, error) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(addLodger, (state, data) => {
        return {
            ...state,
        }
    }),
    on(addLodgerSuccess, (state, data) => {
        return {
            ...state,
            lodgers: state.lodgers.concat(data.lodger)
        }
    }),
    on(addLodgerFailure, (state, error) => {
        return {
            ...state,
        }
    }),
    on(deleteLodger, (state, data) => {
        return {
            ...state,
        }
    }),
    on(deleteLodgerSuccess, (state, data) => {
        return {
            ...state,
            lodgers: state.lodgers.filter(lodger => lodger.id !== data.lodgerId),
        }
    }),
    on(deleteLodgerFailure, (state, error) => {
        return {
            ...state,
        }
    }),
    on(updateLodgersSuccess, (state, data) => {
        return {
            ...state,
            lodgers: state.lodgers.map(lodger => {
                return data.lodgers.find(updated => updated?.id === lodger.id)??lodger;
            })
        }
    }),
    on(toogleCreateLodgerModalSuccess, (state, data) => {
        return {
            ...state,
            createLodgerModalVisible: !state.createLodgerModalVisible
        }
    })
)
