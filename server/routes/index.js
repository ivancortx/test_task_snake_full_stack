const Router = require('express')
const router = new Router()
const userResultController = require('../controllers/userResultController')

router.post('/', userResultController.addNewResult)
router.get('/', userResultController.fetchAllResults)

module.exports = router