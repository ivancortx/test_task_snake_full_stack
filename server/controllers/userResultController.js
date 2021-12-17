const UserResultService = require('../service/user-result-service')
const ApiError = require('../error/ApiError')

class UserResultController {
  async addNewResult(req, res, next) {
    try {
      const {userName, score} = req.body
      const userResultData = await UserResultService.addNewResult(userName, score)
      return res.json(userResultData)
    } catch (e) {
      ApiError.internal(e.message)
    }
  }

  async fetchAllResults(req, res, next) {
    try {
      const allResultsData = await UserResultService.getAllResults()
      return res.json(allResultsData)
    } catch (e) {
      ApiError.internal(e.message)
    }
  }
}

module.exports = new UserResultController()