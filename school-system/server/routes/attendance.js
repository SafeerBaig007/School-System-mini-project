const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance')
const attendanceMiddleware = require('../middlewares/attendance')
const userMiddleware = require('../middlewares/user')


router.post('/markAttendance', attendanceMiddleware.validateAttandenceData, userMiddleware.verifyUser, userMiddleware.isTeacher, userMiddleware.checkUserExist ,attendanceController.markAttendance)

router.get('/viewAttendance/:userId/:startDate/:endDate',userMiddleware.verifyUser,userMiddleware.checkUserExist,attendanceMiddleware.varifyFilterDate ,attendanceController.findAttendanceInRange)

router.get('/viewAttendance/:date',userMiddleware.verifyUser,attendanceMiddleware.verifyFindDate, attendanceController.viewAttendanceMonth)

module.exports = router
