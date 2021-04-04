var express = require('express');
var FaculityModel = require('../models/faculity'); 
var adminRoute = express.Router();
let {checkAuth,checkAdmin,checkCoordinator } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const AdminController = require('../controller/admin.controller');
var bodyParser = require('body-parser');
adminRoute.use(bodyParser.urlencoded({extended: false}));
adminRoute.use(checkAuth);

//tạo tk
adminRoute.get('/createAccount', AdminController.createAccount)
adminRoute.post('/docreateAccount', AdminController.docreateAccount)

//Thêm học sinh vào lớp
adminRoute.get('/addtoFaculty', AdminController.addtoFaculty)
adminRoute.post('/doaddtoFaculty:id', AdminController.doaddtoFaculty)

module.exports = adminRoute;