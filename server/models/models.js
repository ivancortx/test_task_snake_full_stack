const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserResult = sequelize.define('user_result', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userName: {type: DataTypes.STRING, isRequired: true},
  score: {type: DataTypes.INTEGER, defaultValue: 0}
})

module.exports = {
  UserResult
}