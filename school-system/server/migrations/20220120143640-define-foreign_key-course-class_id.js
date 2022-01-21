'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.addConstraint('courses',{
      fields: ['class_id'],
      type: 'foreign key',
      name: 'define-foregin_key-courses-class_id',
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
    queryInterface.removeConstraint('courses', 'define-foregin_key-courses-class_id')
  }
};
