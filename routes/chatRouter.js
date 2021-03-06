const Router = require('express')
const router = new Router()
const controller = require('../controllers/chatController')
const authMidleware = require('../midleware/authMidleware')

router.post('/add_message', authMidleware, controller.addMessage)
router.post('/get_messages', authMidleware, controller.getMessages)
router.get('/get_dialogs', authMidleware, controller.getDialogs)

module.exports = router