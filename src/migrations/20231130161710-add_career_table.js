'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('career', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      career_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      work_type: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      profession_id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      company: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      company_website: {
          allowNull: true,
          type: DataTypes.STRING(255),
      },
      location: {
          allowNull: true,
          type: DataTypes.STRING(255),
      },
      email_apply: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      apply_email: {
        allowNull: true,
        type: DataTypes.STRING(255)
      },
      apply_link: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      color: {
        allowNull: true,
        type: DataTypes.STRING
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      published_at: {
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
    await queryInterface.dropTable('career');
  },
};
