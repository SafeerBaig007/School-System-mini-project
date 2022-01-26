'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // course.belongsTo(models.class_room,{
      //   foreignKey : 'class_id'
      // })
    }
  };
  course.init({
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isAlphanumeric : true,
      }
    },
    discription: {
      type : DataTypes.STRING,
      allowNull : true,
    }
  }, {
    sequelize,
    modelName: 'course',
    timestamps : false,
  });
  return course;
};