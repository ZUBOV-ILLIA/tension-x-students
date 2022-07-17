import { State } from "../react-app-env";

export const getStudentsSelector = (state: State) => state.mainData.data;
export const getCountSelector = (state: State) => state.mainData.totalCount;
export const getPagesSelector = (state: State) => state.mainData.totalPages;
export const exportUsersSelector = (state: State) => state.exportData;