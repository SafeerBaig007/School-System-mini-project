const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin');
const adminController = require('../controllers/admin')

router.post('/login', adminMiddleware.validateLoginData, adminController.login)

router.post('/signup',adminMiddleware.signupAdmin,adminMiddleware.checkUserExist,adminController.signup)

router.post('/resetPassword',adminMiddleware.validatePassword,adminMiddleware.authenticateAdmin,adminController.resetPassword)

module.exports = router
