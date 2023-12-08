const _ = require('lodash');
const { Career, WorkType } = require('../models');
const { Profession } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const cryptoService = require('./crypto.service');
const jwt = require('../utils/jwt');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const sequelizeClient = require('./../utils/sequelize-client');
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
    likeColumns: ['id', 'user_id'],
    where: {
      status: true,
    },
  });

  const count = await Career.count({
    where: options.where,
  });

  const data = await Career.findAll({
    attributes: ['user_id', 'name', 'surname', 'username', 'email'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

async function getByID() {
  return {
    status: true,
    data: 1
  };
}



async function getOldAll() {
  const careers = await sequelizeClient.query('SELECT * FROM careers');
  for await (const c of careers[0]) {
    const workTypes = await WorkType.findAll();
    //console.log('workTypes', workTypes);
    const worktypes = JSON.parse(c.worktypes);
    console.log('worktypes => ', worktypes);
    
    const now = moment.utc().toISOString();
     const slugBig = c.title;
     const slug = slugBig.toLowerCase();
     const createCareer = await Career.create({
     career_id: uuidv4(),
     name: c.title,
     slug: slugify(slug, '-'),
     work_type: c.worktypes,
     company: c.corporate,
     company_website: c.website,
     location: c.location,
     color: c.color,
     email_apply: c.applytype === 10 ? 1 : 0,
     apply_email: c.applyemail,
     description: c.description === null ? 'empty' : c.description,
     status: 1,
     is_published: c.published,
     created_at: now,
     updated_at: now,
     });
     console.log('createCareer', createCareer);
   }
  return {
    status: true,
    data: 1
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
  const foundUser = await Career.count({
    where: {
      email: email,
    },
  });

  if (foundUser) {
    throw new GenericError(400, '', `User already exists!`, foundUser);
  }

  const now = moment.utc().toISOString();
  const createUser = await Career.create({
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
  const foundUser = await Career.count({
    where: {
      user_id: AUTH.user_id,
    },
  });

  if (!foundUser) {
    throw new GenericError(400, '', `User not exists!`, foundUser);
  }

  const now = moment.utc().toISOString();
  const [updateUser] = await Career.update(
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

  return Career.findOne(filter);
}

async function revokeRequestToken() {}

module.exports = {
  createUser,
  getUser,
  createUserToken,
  updateUser,
  getAll,
  getOldAll,
  getByID,
  revokeRequestToken,
};
