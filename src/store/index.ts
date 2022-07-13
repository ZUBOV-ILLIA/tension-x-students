import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { State } from "../react-app-env";

const initialState: State = {
  data: {
    data: [],
  },
  totalCount: 0,
  totalPages: 0,
}

export const setUsersAction = createAction<State>('SET_USERS');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUsersAction, (state, action) => ({
    ...action.payload
  }))
})

export const store = configureStore({ reducer });