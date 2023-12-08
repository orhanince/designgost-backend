'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      user_name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      display_name: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      about: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      career_title: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      current_company: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      country_id: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      option: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      member_type: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      mentor_active: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      expertise: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      experience_days: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      location: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      position: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      notifications: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      is_email_verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_register_completed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      remember_token: {
        allowNull: true,
        type: DataTypes.TEXT,
        defaultValue: DataTypes.TEXT,
      },
      activation_token: {
        allowNull: true,
        type: DataTypes.TEXT,
        defaultValue: DataTypes.TEXT,
      },
      email_verified_at: {
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
    await queryInterface.dropTable('user');
  },
};
