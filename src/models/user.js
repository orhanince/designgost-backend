const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-client');

const User = sequelize.define(
  'user',
  {
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
    tableName: 'user',
  }
);

module.exports = { User };
