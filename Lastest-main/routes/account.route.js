var express = require('express');
var router = express.Router();
var {signUpController, loginController,indexAdmin,indexCoordinator, indexStudent,indexManager,indexGuest} = require('../controller/account.controller');
const {checkAuth, isEmail , checkAdmin,checkLogin,checkCoordinator} = require('../middleware/index');
router.post('/sign-up', isEmail, signUpController)
router.post('/dologin', checkLogin, loginController)

router.get('/indexAdmin',checkAuth ,checkAdmin, indexAdmin)
router.get('/indexCoordinator',checkAuth ,checkCoordinator, indexCoordinator)
router.get('/indexStudent',checkAuth , indexStudent)
router.get('/indexGuest',checkAuth,indexGuest)
router.get('/indexManager',checkAuth,indexManager)
module.exports = router
