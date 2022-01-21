'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      school.belongsTo(models.admin, {
        foreignKey : 'admin_id'
      })
      school.hasMany(models.user, {
        foreignKey : 'school_id'
      })
      school.hasMany(models.class_room,{
        foreignKey : 'school_id'
      })
    }
  };
  school.init({
    school_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type :DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate :{
        isAlphanumeric : true,
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'school',
    timestamps : false,
  });
  return school;
};