'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      admin.hasOne(models.school, {
        foreignKey : 'admin_id',
      })
    }
  };
  admin.init({
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    dob:{
      allowNull: false,
      type: DataTypes.DATE,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate : {
        len: [3,64],
        notEmpty: false,
      }
    },
    last_name:  {
      allowNull: false,
      type: DataTypes.STRING,
      validate : {
        len: [3,64],
        notEmpty: false,
      }
    },
    phone:{
      type : DataTypes.STRING,
      allowNull : true,
      validate:{
        isNumeric : true,
        len: [11, 18]
      }
    },
    email: {
      type : DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail : true,
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        len: [6, 64]
      }
    },
    token : {
      type : DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'admin',
    timestamps : false,
  });
  return admin;
};