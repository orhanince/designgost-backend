'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('newsletter', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      newsletter_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      last_name: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      email: {
         allowNull: false,
         type: DataTypes.STRING(255),
      },
      interests: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('newsletter');
  },
};
