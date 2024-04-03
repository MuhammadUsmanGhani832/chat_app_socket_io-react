const express = require("express")
const chatController = require('../controller/message.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, chatController.getMessages);
router.post('/send/:id', auth, chatController.sendMessage);



module.exports = router;