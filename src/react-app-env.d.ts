/// <reference types="react-scripts" />

export interface State {
  data: StateData,
  totalCount: number,
  totalPages: number,
}

export interface StateData {
  [key: string]: Student[]
}

export interface Student {
  class: string,
  id: number,
  name: string,
  parents: Parents[],
  score: string,
  speed: string,
  tests: Tests[],
}

export interface Parents {
  [key: number]: string,
}

export interface Tests {
  absent: boolean,
  concept: string,
  date: string,
  expSpeed: string,
  label: string,
  score: number,
  speed: string,
  total: number,
}