/// <reference types="react-scripts" />

export interface State {
  mainData: StateData
}

export interface StateData {
  data: Student[]
  totalCount: number,
  totalPages: number,
}

export interface Student {
  class: string,
  id: number,
  name: string,
  parents: string[],
  score: string,
  speed: string,
  tests: Tests[],
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