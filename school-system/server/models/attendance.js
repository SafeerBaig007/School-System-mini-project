'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      attendance.belongsTo(models.user,{
        foreignKey : 'user_id'
      })
    }
  };
  attendance.init({
    attendance_date: DataTypes.DATEONLY,
    remark: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn:[['present', 'absent', 'sick', 'causal']]
      }
    },
  }, {
    sequelize,
    modelName: 'attendance',
    timestamps : false,
  });
  return attendance;
};