'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('podcast', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      podcast_id: {
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
      description: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      person: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      person_career: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      embed: {
         allowNull: true,
         type: DataTypes.TEXT,
      },
      spotify_embed: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
      duration: {
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
    await queryInterface.dropTable('podcast');
  },
};
