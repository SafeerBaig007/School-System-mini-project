'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //  await queryInterface.removeConstraint('users', 'define-foregin_key-users-school_id')
     queryInterface.addConstraint('users',{
      fields: ['school_id'],
      type: 'foreign key',
      name: 'define-foregin_key-users-school_id-ok',
      references: { //Required field
        table: 'schools',
        field: 'school_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('users', 'define-foregin_key-users-school_id-ok')
  }
};
