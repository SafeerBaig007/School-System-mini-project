const admin = require("../models/admin");
const adminJoiValidations = require("./joi-middlewares-validations/admin-joi");
const adminModel = require("../models").admin;
const jwt = require("jsonwebtoken");
const keys = require("../../encryption_keys");

const signupAdmin = (req, res, next) => {
  try {
    const validationResult = adminJoiValidations.signupValidation.validate({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
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

const validatePassword = (req, res, next)=>{
    try {
        const validationResult = adminJoiValidations.resetPassword.validate({
          password: req.body.new_password,
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
}

const checkUserExist = async (req, res, next) => {
  try {
    const admin = await adminModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (admin instanceof adminModel) {
      return res.status(409).send({ message: "User already exist." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
    });
  }
};

const validateLoginData = (req, res, next) => {
  try {
    const validationResult = adminJoiValidations.loginValidation.validate({
      email: req.body.email,
      password: req.body.password
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

const authenticateAdmin = (req, res, next) => {
  try {
    let headerToken = req.headers.authorization;
    if (!headerToken) {
      return res
        .status(403)
        .json({ error: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(headerToken, keys);
      console.log(decoded)

      if (decoded.user_type == 'admin'){
        req.admin = {admin_id: decoded.admin_id, email:decoded.email, school_id:decoded.school_id };
        // console.log('ooookkkkk',req.admin)
      }else{
        return res.status(401).json({ error: "Invalid Token" });
      }
    } catch (err) {
        console.log(err)
      return res.status(401).json({ error: "Invalid Token" });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
    });
  }
};

module.exports = {
  signupAdmin,
  checkUserExist,
  validateLoginData,
  authenticateAdmin,
  validatePassword
};
