const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-client');

const Podcast = sequelize.define(
  'podcast',
  {
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
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'podcast',
  }
);

module.exports = { Podcast };
