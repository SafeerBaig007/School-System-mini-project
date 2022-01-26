'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('admins', {
      fields: ['email'],
      type: 'unique',
      name: 'add-unique-email-constraint-admins'
    });
    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'add-unique-email-constraint-users'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('admins', 'add-unique-email-constraint-admins')
    queryInterface.removeConstraint('users', 'add-unique-email-constraint-users')
  }
};
