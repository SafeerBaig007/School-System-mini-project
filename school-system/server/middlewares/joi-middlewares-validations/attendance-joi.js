const Joi = require("joi");

const attendanceValidation = Joi.object({
    attendance_date: Joi.date().required(),
    remark: Joi.string().required(),
    user_id: Joi.number().required()
})

const attendanceDateValidation = Joi.object({
    find_date: Joi.date().required(),
})
const attendanceDateRangeValidation = Joi.object({
    start_date: Joi.date().required(),
    end_date: Joi.date().required()
})
module.exports = {
    attendanceValidation,
    attendanceDateValidation,
    attendanceDateRangeValidation
}