'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_room_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  class_room_user.init({
    user_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {
    timestamps : false,
    sequelize,
    modelName: 'class_room_user',
  });
  return class_room_user;
};