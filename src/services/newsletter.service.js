const { Newsletter } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');

/**
 * Get all newsletters
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'newsletter_id'],
    where: {
      status: true,
    },
  });

  const count = await Newsletter.count({
    where: options.where,
  });

  const data = await Newsletter.findAll({
    attributes: ['newsletter_id', 'first_name', 'last_name','email'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Add new newsletter.
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {string} email 
 * @param {string} interests 
 * @returns 
 */
async function create({ body }) {
  const { first_name, last_name, email, interests } = body || {};
  
  const foundNewsletter = await Newsletter.count({
    where: {
      email: email,
    },
  });

  if (foundNewsletter) {
    throw new GenericError(400, '', `Newsletter already exists!`, foundNewsletter);
  }

  const now = moment.utc().toISOString();
  const createNewsletter = await Newsletter.create({
    newsletter_id: uuidv4(),
    first_name: first_name,
    last_name: last_name,
    interests: interests,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createNewsletter) {
    return {
      status: true,
      data: createNewsletter
    };
  }
}

/**
 * Get single newsletter by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getNewsletter({ params }) {
  const { newsletter_id } = params || {}
  return await Newsletter.findOne({
    where: {
      newsletter_id: newsletter_id
    }
  });
}

/**
 * Update newsletter by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { newsletter_id } = params || {};
  const { first_name, last_name, email, interests, status } = body || {};
  
  const foundNewsletter = await Newsletter.findOne({
    where: {
      newsletter_id: newsletter_id
    }
  });

  if (!foundNewsletter) {
    throw new GenericError(400, '', `Newsletter does not exist!`, foundNewsletter);
  }

  const now = moment.utc().toISOString();
  const [updateNewsletter] = await Newsletter.update(
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      interests: interests,
      status: status,
      updated_at: now,
    },
    {
      where: {
        newsletter_id: newsletter_id,
      }
    }
  );

  return {
    status: true,
    data: updateNewsletter
  };
}

/**
 * Delete newsletter by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deleteNewsletter({ params }) {
  const { newsletter_id } = params || {};

  const foundNewsletter = await Newsletter.findOne({
    where: {
      newsletter_id: newsletter_id
    }
  });

  if (!foundNewsletter) {
    throw new GenericError(400, '', `Country does not exist!`, foundNewsletter);
  }

  const now = moment.utc().toISOString();
  const deleteNewsletter = await Newsletter.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        newsletter_id: newsletter_id,
      }
    }
  );

  return {
    status: true,
    data: deleteNewsletter
  };
}

module.exports = {
  getAll,
  getNewsletter,
  create,
  update,
  deleteNewsletter
};
