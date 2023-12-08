'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('discount', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      discount_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      position: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      code: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      card_text: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      banner_text: {
         allowNull: true,
         type: DataTypes.TEXT
      },
      url: {
          allowNull: true,
          type: DataTypes.TEXT
      },
      is_featured: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      is_published: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      published_start_date: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
      },
      published_end_date: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
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
    await queryInterface.dropTable('discount');
  },
};
