const jsonwebtoken = require("jsonwebtoken");
const schoolJoiValidations = require("./joi-middlewares-validations/school-joi");
const jwt = require('jsonwebtoken')
const Controller = require('../models/school')


const registerSchoolValidate = (req, res, next) => {
  try {
    const validationResult = schoolJoiValidations.registrationValidation.validate({
        name:req.body.name,
        address: req.body.address
    })
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

const authenticateAdminSchool = async (req, res, next)=>{
  try {
    const adminSchool = await schoolController.findOne({
      where:{
        admin_id : req.admin.admin_id
      }
    })
    
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
}

module.exports = {
    registerSchoolValidate,
    authenticateAdminSchool
};
