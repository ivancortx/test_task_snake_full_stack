import { useSelector } from 'react-redux'
import { AppStateType } from 'store'

export const useHomePage = () => {
  const userResultsData = useSelector((state: AppStateType) => state.resultsData.ratingTable)
  return userResultsData
}