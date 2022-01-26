const schoolModel = require("../models").school;
const adminModel = require("../models").admin;

const registerSchool = async (req, res, next) => {
  try {
    let admin = await adminModel.findOne({
      where: {
        admin_id: req.admin.admin_id,
      },
    });
    console.log(await admin.getSchool());
    if (!await admin.getSchool()) {
      const school = await admin.createSchool({
        name: req.body.name,
        address: req.body.address,
      });
    } else {
      return res.status(400).send({ message: "Admin has already registered school" });
    }
    let school = await schoolModel.create({
      name: req.body.name,
      address: req.body.address,
      admin_id: req.admin.admin_id
    });
    return res
      .status(201)
      .send({ message: "school has been registered", school });
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
};



module.exports = {
  registerSchool,
};
