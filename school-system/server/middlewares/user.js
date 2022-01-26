const userJoiValidations = require("./joi-middlewares-validations/user-joi");
const userModel = require("../models").user;
// const adminController = require('./admin')
const jwt = require("jsonwebtoken");
const keys = require("../../encryption_keys");

const createUserValidate = (req, res, next) => {
  try {
    const validationResult = userJoiValidations.signupValidation.validate({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      user_type: req.body.user_type,
      school_id: req.body.school_id,
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

const checkUserExistByEmail = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user instanceof userModel) {
      return res.status(409).send({ message: "User already exist." });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
    });
  }
};

const validateLoginData = (req, res, next) => {
  try {
    const validationResult = userJoiValidations.loginValidation.validate({
      email: req.body.email,
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

const authenticateUser = (req, res, next) => {
  try {
    let headerToken = req.headers.authorization;
    if (!headerToken) {
      return res
        .status(403)
        .json({ error: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(headerToken, keys);
      console.log(decoded);
      req.user = {
        user_id: decoded.user_id,
        email: decoded.email,
        user_type: decoded.user_type,
      };
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Invalid Token" });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
    });
  }
};

const checkUserType = (req, res, next) => {
  if (req.body.user_type == "teacher" || req.body.user_type == "student")
    next();
  return res.status(400).send({ error: "Invalid User type" });
};

const isTeacher = (req, res, next)=>{
  if(req.user.user_type == 'teacher'){
    next()
  }else{
    return res.status(403).json({ error: "Invalid operation" });
  }
}

const verifyUser = (req, res, next) => {
    try {
        let headerToken = req.headers.authorization;
        if (!headerToken) {
          return res
            .status(403)
            .json({ error: "A token is required for authentication" });
        }
        try {
          const decoded = jwt.verify(headerToken, keys);
            req.user = {
                user_id: decoded.user_id,
                email: decoded.email,
                user_type: decoded.user_type,
              };
        } catch (err) {
          return res.status(401).json({ error: "Invalid Token" });
        }
        return next();
      } catch (error) {
        return res.status(500).json({
          error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
        });
      }
};

const checkUserExist = async (req, res, next) => {
    try {
      let user;
      if( req.body.user_id){
         user = await userModel.findOne({
          where: {
            user_id: req.body.user_id,
          },
        });
      }else if(req.params.userId){
         user = await userModel.findOne({
          where: {
            user_id: req.params.userId,
          },
        });
      }
      if (user instanceof userModel) {
        next();
      } else {
        return res.status(409).send({ message: "User does not exist." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
      });
    }
  };
const addUserType = (req, res, next)=>{
  if(req.path=='/viewTeachers'){
    req.user_type = 'teacher'
  }else if (req.path=='/viewStudents'){
    req.user_type = 'student'
  }
  next()
}
module.exports = {
  createUserValidate,
  checkUserExistByEmail,
  validateLoginData,
  authenticateUser,
  checkUserType,
  verifyUser,
  checkUserExist,
  isTeacher,
  addUserType
};
