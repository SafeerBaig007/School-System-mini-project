const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user');
const userController = require('../controllers/user')
const adminMiddleware = require('../middlewares/admin')
const schoolMiddleware = require('../middlewares/school')

router.post('/login', userMiddleware.validateLoginData, userController.login)

router.post('/createUser',adminMiddleware.authenticateAdmin,userMiddleware.createUserValidate,userMiddleware.checkUserExistByEmail,userController.createUser)

router.get('/viewTeachers',adminMiddleware.authenticateAdmin,userMiddleware.addUserType, userController.findUsersByType)

router.get('/viewAllStudents',adminMiddleware.authenticateAdmin,userMiddleware.checkUserExistByEmail,userController.createUser)

module.exports = router
