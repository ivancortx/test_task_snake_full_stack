import { Dispatch } from 'react'

import { WRITE_RESULTS_SCORE } from './types'
import { UserScoreDataType } from '../interfaces/homePage/HomePageInterfaces'
import { getUsersResults, sendUserResult } from 'api/api'

export type ActionsTypes = writeUserResultsType

type writeUserResultsType = {
  type: typeof WRITE_RESULTS_SCORE
  data: UserScoreDataType[]
}

export const writeUserResults = (data: UserScoreDataType[]): writeUserResultsType => ({
  type: WRITE_RESULTS_SCORE,
  data
})

export const fetchUsersResults = () => async (dispatch: Dispatch<ActionsTypes>) => {
  const response = await getUsersResults()
  dispatch(writeUserResults(response.data))
}

export const sendResult = (userName: string, score: number) => async (dispatch: Dispatch<ActionsTypes>) => {
  await sendUserResult(userName, score)
  // @ts-ignore
  dispatch(fetchUsersResults())
}