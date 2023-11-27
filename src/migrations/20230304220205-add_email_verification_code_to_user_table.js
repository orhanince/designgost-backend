'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('user', 'email_verification_code', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'is_email_verified',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('user', 'email_verification_code', {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.STRING,
      after: 'is_email_verified',
    });
  },
};
