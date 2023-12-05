const _ = require('lodash');
const { JobType } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const { default: slugify } = require('slugify');
/**
 * Get all users
 * @param pagination
 * @param AUTH
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'job_type_id'],
    where: {
      status: true,
    },
  });

  const count = await JobType.count({
    where: options.where,
  });

  const data = await JobType.findAll({
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Create new job type.
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ name }) {
  const slug = slugify(name, '_');
  const foundJobType = await JobType.count({
    where: {
      slug: slug,
    },
  });

  if (foundJobType) {
    throw new GenericError(400, '', `Job type already exists!`, foundJobType);
  }

  const now = moment.utc().toISOString();
  const createJobType = await JobType.create({
    job_type_id: uuidv4(),
    name: name,
    slug: slugify(name, '_'),
    language: 'tr',
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createJobType) {
    return {
      status: true,
      data: createJobType
    };
  }
}

/**
 * Get single user form database.
 * @param req
 * @returns {Promise<any>}
 */
async function getJobType({ user_id, email }) {
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
  return JobType.findOne(filter);
}

/**
 * Update single user form database.
 * @param req
 * @returns {Promise<any>}
 */
async function updateUser({ body, AUTH }) {
  const { bio, hair_color, favorite_food } = body;
  const foundUser = await JobType.count({
    where: {
      user_id: AUTH.user_id,
    },
  });

  if (!foundUser) {
    throw new GenericError(400, '', `User not exists!`, foundUser);
  }

  const now = moment.utc().toISOString();
  const [updateUser] = await JobType.update(
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

  return JobType.findOne(filter);
}

async function revokeRequestToken() {}

module.exports = {
  create,
  getJobType,
  createUserToken,
  updateUser,
  getAll,
  revokeRequestToken,
};
