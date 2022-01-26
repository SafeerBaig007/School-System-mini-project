const attendanceModel = require('../models').attendance
const Sequelize = require('sequelize');

const markAttendance = async (req, res)=>{
    try {
        const findAttendance = await attendanceModel.findOne({
            where:{
                attendance_date: req.body.attendance_date,
                    user_id: req.body.user_id
            }
        })
        if (findAttendance){
            await attendanceModel.update({
                attendance_date : req.body.attendance_date,
                remark: req.body.remark,
                user_id: req.body.user_id
            }, {
                where:{
                    attendance_date: req.body.attendance_date,
                        user_id: req.body.user_id
                }
            })
            return res.status(200).send('Attendance has been updated')
        }else{
            await attendanceModel.create({
                attendance_date : req.body.attendance_date,
                remark: req.body.remark,
                user_id: req.body.user_id
            })
            return res.status(201).send('Attendance has been marked is created')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, message : error})
    }
}
const updateAttendance = (req, rea)=>{

}

const deleteAttendance = (req, res)=>{

}

const viewAttendanceMonth = async  (req, res)=>{
    try {
        let data = await attendanceModel.findAll({
            where: {
                attendance_date: req.params.date
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).send({success: false, message : error})
    }
}


const findAttendanceInRange = async  (req, res)=>{
    try {
        let data = await attendanceModel.findAll({
            where: {
                attendance_date: {
                  [Sequelize.Op.between]: [req.params.startDate, req.params.endDate]
                }
              }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, message : error})
    }
}

module.exports = {
    markAttendance,
    updateAttendance,
    viewAttendanceMonth,
    deleteAttendance,
    findAttendanceInRange
}