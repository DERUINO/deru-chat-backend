const Router = require('express')
const router = new Router()
const controller = require('../controllers/settingsController')
const authMidleware = require('../midleware/authMidleware')

router.get('/create_roles', controller.createRoles);
router.get('/users/list', authMidleware, controller.getUsers)
router.post('/users/info', authMidleware, controller.getUserInfo);

module.exports = router