'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.school,{
        foreignKey : 'school_id'
      })
      user.hasMany(models.attendance,{
        foreignKey : 'user_id'
      })
      user.belongsToMany(models.class_room,{through : 'class_room_user'})
      // define association here
    }
  };
  user.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : true,
      validate:{
        len: [6, 64]
      }
    },
    user_type: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : [['teacher', 'student']]
      }
    },
    dob: {
      type : DataTypes.STRING,
      allowNull: false,
    },
    join_date: {
      type : DataTypes.STRING,
      allowNull : false,
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
  }, {
    sequelize,
    modelName: 'user',
    timestamps : false,
  });
  return user;
};