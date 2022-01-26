const attendanceJoiValidations = require('./joi-middlewares-validations/attendance-joi')
const validateAttandenceData = (req, res, next) => {
  try {
    const validationResult = attendanceJoiValidations.attendanceValidation.validate({
    attendance_date: req.body.attendance_date,
    remark: req.body.remark,
    user_id: req.body.user_id,
    });

    if (!validationResult.error) {
      next();
    } else {
      let validationErrorMessage = "";
      validationResult.error.details.forEach((e, index) => {
        validationErrorMessage = validationErrorMessage + e.message + ",";
      });
      return res.status(400).json({ error: validationErrorMessage });
    }
  } catch (error) {
    return res.status(500).json({
      error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
    });
  }
};

const verifyFindDate = (req, res, next)=>{
    console.log(req.params)
    try {
        const validationResult = attendanceJoiValidations.attendanceDateValidation.validate({
        find_date: req.params.date,
        });
    
        if (!validationResult.error) {
          next();
        } else {
          let validationErrorMessage = "";
          validationResult.error.details.forEach((e, index) => {
            validationErrorMessage = validationErrorMessage + e.message + ",";
          });
          return res.status(400).json({ error: validationErrorMessage });
        }
      } catch (error) {
          console.log(error)
        return res.status(500).json({
          error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
        });
      }
}

const varifyFilterDate = (req, res, next)=>{
    try {
        const validationResult = attendanceJoiValidations.attendanceDateRangeValidation.validate({
        start_date: req.params.startDate,
        end_date: req.params.endDate
        });
    
        if (!validationResult.error) {
          next();
        } else {
          let validationErrorMessage = "";
          validationResult.error.details.forEach((e, index) => {
            validationErrorMessage = validationErrorMessage + e.message + ",";
          });
          return res.status(400).json({ error: validationErrorMessage });
        }
      } catch (error) {
          console.log(error)
        return res.status(500).json({
          error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
        });
      }
}
module.exports = {
  validateAttandenceData,
  verifyFindDate,
  varifyFilterDate
};
