import { WRITE_RESULTS_SCORE } from './types'
import { ActionsTypes } from './action'
import { UserScoreDataType } from '../interfaces/homePage/HomePageInterfaces'

type InitialStateType = {
  ratingTable: UserScoreDataType[]
}

const initialState: InitialStateType = {
  ratingTable: [],
}

export const reducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
  case WRITE_RESULTS_SCORE:
    return {
      ...state,
      ratingTable: action.data,
    }
  default:
    return state
  }
}
