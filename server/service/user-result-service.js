const {UserResult} = require('../models/models')

class UserResultService {
  async addNewResult(userName, score) {
    const userResult = await UserResult.create({ userName, score })  //сохраняем user-а в БД
    return userResult
  }

  async getAllResults() {
    return await UserResult.findAll()  //сохраняем user-а в БД
  }
}

module.exports = new UserResultService()