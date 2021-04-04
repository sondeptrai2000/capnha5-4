var express = require('express');
var FaculityModel = require('../models/faculity'); 
var coordinatorRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const coordinatorController = require('../controller/coordinator.controller');
coordinatorRoute.use(checkAuth);

coordinatorRoute.get('/addCoordinator',coordinatorController.addCoordinator)
coordinatorRoute.post('/doAddCoordinator', isEmail,coordinatorController.doAddCoordinator)

coordinatorRoute.get('/update:id',coordinatorController.update)
coordinatorRoute.get('/delete:id',coordinatorController.deleteCoordinator)


coordinatorRoute.post('/doupdate:id', coordinatorController.doupdate)

module.exports = coordinatorRoute