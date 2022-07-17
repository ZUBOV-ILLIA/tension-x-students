import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { State, Student } from "../react-app-env";

const initialState: State = {
  mainData: {
    data: [],
    totalCount: 0,
    totalPages: 0,
  },
  exportData: [],
}

export const setUsersAction = createAction<State>('SET_USERS');
export const addExportUsersAction = createAction<Student>('ADD_USERS');
export const removeExportUsersAction = createAction<number>('REMOVE_USERS');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUsersAction, (state, action: any) => {
    state.mainData = action.payload;
  })
  builder.addCase(addExportUsersAction, (state, action: any) => {
    state.exportData.push(action.payload);
  })
  builder.addCase(removeExportUsersAction, (state, action: any) => {
    state.exportData = state.exportData.filter(student => student.id !== action.payload);
  })
})

export const store = configureStore({ reducer });