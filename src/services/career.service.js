const _ = require('lodash');
const { User } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const cryptoService = require('./crypto.service');
const jwt = require('../utils/jwt');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
/**
 * Get all users
 * @param pagination
 * @param AUTH
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'user_id'],
    where: {
      status: true,
    },
  });

  const count = await User.count({
    where: options.where,
  });

  const data = await User.findAll({
    attributes: ['user_id', 'name', 'surname', 'username', 'email'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Add new job.
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function createUser({ name, email, password }) {
  const foundUser = await User.count({
    where: {
      email: email,
    },
  });

  if (foundUser) {
    throw new GenericError(400, '', `User already exists!`, foundUser);
  }

  const now = moment.utc().toISOString();
  const createUser = await User.create({
    user_id: uuidv4(),
    name: name,
    email: email,
    password: cryptoService.hashPassword(password),
    is_email_verified: false,
    email_verification_code: uuidv4(),
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createUser) {
    return {
      status: true,
      token: jwt.createJwtToken({
        user_id: JSON.parse(JSON.stringify(createUser)).user_id,
        name: JSON.parse(JSON.stringify(createUser)).user_id.name,
        email: JSON.parse(JSON.stringify(createUser)).email,
        bio: JSON.parse(JSON.stringify(createUser)).bio,
        hair_color: JSON.parse(JSON.stringify(createUser)).hair_color,
        favorite_food: JSON.parse(JSON.stringify(createUser)).favorite_food,
      }),
    };
  }
}

/**
 * Get single user form database.
 * @param req
 * @returns {Promise<any>}
 */
async function getUser({ user_id, email }) {
  const filter = {
    where: {
      status: true,
      deleted_at: null,
    },
  };
  if (!_.isEmpty(user_id)) {
    filter.where.user_id = user_id;
  } else if (!_.isEmpty(email)) {
    filter.where.email = email;
  }
  return User.findOne(filter);
}

/**
 * Update single user form database.
 * @param req
 * @returns {Promise<any>}
 */
async function updateUser({ body, AUTH }) {
  const { bio, hair_color, favorite_food } = body;
  const foundUser = await User.count({
    where: {
      user_id: AUTH.user_id,
    },
  });

  if (!foundUser) {
    throw new GenericError(400, '', `User not exists!`, foundUser);
  }

  const now = moment.utc().toISOString();
  const [updateUser] = await User.update(
    {
      bio: bio,
      hair_color: hair_color,
      favorite_food: favorite_food,
      updated_at: now,
    },
    {
      where: {
        user_id: AUTH.user_id,
      },
    }
  );
  return {
    status: true,
    data: updateUser,
  };
}

/**
 * Create user token.
 * @param {string} user_id
 * @param {string} email
 * @returns {Promise<*>}
 */
async function createUserToken({ user_id, email }) {
  const filter = {
    status: true,
    deleted_at: null,
  };

  if (!_.isEmpty(user_id)) {
    filter.user_id = user_id;
  } else if (!_.isEmpty(email)) {
    filter.email = email;
  }

  return User.findOne(filter);
}

async function revokeRequestToken() {}

module.exports = {
  createUser,
  getUser,
  createUserToken,
  updateUser,
  getAll,
  revokeRequestToken,
};
