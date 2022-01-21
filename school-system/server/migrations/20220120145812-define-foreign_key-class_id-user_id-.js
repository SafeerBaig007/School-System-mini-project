'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('class_room_users',{
      fields: ['class_id'],
      type: 'foreign key',
      name: 'define-foregin_key-class_room_user-class_id',
      references: { //Required field
        table: 'class_rooms',
        field: 'class_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('class_room_users',{
      fields: ['user_id'],
      type: 'foreign key',
      name: 'define-foregin_key-class_room_user-user_id',
      references: { //Required field
        table: 'class_rooms',
        field: 'class_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('class_room_users','define-foregin_key-class_room_user-class_id')
    await queryInterface.removeConstraint('class_room_users','define-foregin_key-class_room_user-user_id')
  }
};
