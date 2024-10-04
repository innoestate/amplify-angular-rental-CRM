import { createReducer, on } from "@ngrx/store";
import { Estate } from "../../core/models/estate.model";
import { createEstate, createEstateFailure, createEstateSuccess, deleteEstateSuccess, loadEstates, loadEstatesFailure, loadEstatesSuccess, toogleCreateEstateModalSuccess, toogleSetLodgerModalSuccess } from "./estates.actions";

export interface State {
  estates: Estate[];
  loading: boolean;
  createEstateModalVisible: boolean;
  setLodgerModalVisible: boolean;
}

export const initialState: State = {
  estates: [],
  loading: false,
  createEstateModalVisible: false,
  setLodgerModalVisible: false
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
  }),
  on(createEstate, (state, data) => {
    return {
      ...state,
      // loading: true
    }
  }),
  on(createEstateSuccess, (state, data) => {
    return {
      ...state,
      // loading: false,
      estates: [...state.estates, data.estate]
    }
  }),
  on(createEstateFailure, (state, error) => {
    console.error('error', error);
    return {
      ...state,
      // loading: false
    }
  }),
  on(deleteEstateSuccess, (state, data) => {
    return {
      ...state,
      estates: state.estates.filter(estate => estate.id !== data.estate.id)
    }
  }),
  on(toogleCreateEstateModalSuccess, (state, data) => {
    return {
      ...state,
      createEstateModalVisible: data.visible
    }
  }),
  on(toogleSetLodgerModalSuccess, (state, data) => {
    return {
      ...state,
      setLodgerModalVisible: data.visible
    }
  })
)
