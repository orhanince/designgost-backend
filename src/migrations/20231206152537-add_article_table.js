'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('article', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      article_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      design_category_id: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: true,
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
      content: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      cover_img: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      word_count: {
          allowNull: true,
          type: DataTypes.INTEGER,
      },
      read_time: {
          allowNull: true,
          type: DataTypes.INTEGER,
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
        allowNull: true,
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
    await queryInterface.dropTable('article');
  },
};
