const express = require('express')
const router = express.Router();
const schoolMiddleware = require('../middlewares/school')
const schoolController = require('../controllers/school')
const adminMiddleware = require('../middlewares/admin')

router.post('/registerSchool',schoolMiddleware.registerSchoolValidate,adminMiddleware.authenticateAdmin ,schoolController.registerSchool)

router.post('/updateSchoolInfo',schoolMiddleware.registerSchoolValidate,adminMiddleware.authenticateAdmin ,schoolController.registerSchool)


module.exports = router