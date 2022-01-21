'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('users',{
      fields: ['school_id'],
      type: 'foreign key',
      name: 'define-foregin_key-users-school_id',
      references: { //Required field
        table: 'admins',
        field: 'admin_id'
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
    queryInterface.addConstraint('users', 'define-foregin_key-users-school_id')
  }
};
