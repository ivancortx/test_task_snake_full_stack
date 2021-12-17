import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const getUsersResults = () => {
  return instance.get(`api/`)
}

export const sendUserResult = (userName: string, score: number) => {
  return instance.post(`api/`, {
    userName,
    score
  })
}