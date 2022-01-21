'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.addConstraint('class_rooms',{
      fields: ['school_id'],
      type: 'foreign key',
      name: 'define-foregin_key-class-room-school_id',
      references: { //Required field
        table: 'schools',
        field: 'school_id'
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
    queryInterface.removeConstraint('attenances','define-foregin_key-class-room-school_id')
  }
};
