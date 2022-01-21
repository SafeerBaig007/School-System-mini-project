'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      class_room.belongsTo(models.school,{
        foreignKey: 'school_id'
      })
      class_room.hasMany(models.course,{
        foreignKey: 'class_id'
      })
      class_room.belongsToMany(models.user,{through : 'class_room_user'})
    }
  };
  class_room.init({
    class_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        isAlphanumeric: true,
      }
    },
    discription : {
      type : DataTypes.STRING,
      allowNull : true,
    }
  }, {
    sequelize,
    modelName: 'class_room',
    timestamps : false,
  });
  return class_room;
};