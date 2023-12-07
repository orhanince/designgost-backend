const { Country } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');

/**
 * Get all countries
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'country_id'],
    where: {
      status: true,
    },
  });

  const count = await Country.count({
    where: options.where,
  });

  const data = await Country.findAll({
    attributes: ['country_id', 'name', 'code','status'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Add new country.
 * @param {string} name 
 * @param {string} code 
 * @returns 
 */
async function create({ body }) {
  const { name, code } = body || {};
  
  const foundCountry = await Country.count({
    where: {
      code: code,
    },
  });

  if (foundCountry) {
    throw new GenericError(400, '', `Country already exists!`, foundCountry);
  }

  const now = moment.utc().toISOString();
  const createCountry = await Country.create({
    country_id: uuidv4(),
    name: name,
    code: code,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createCountry) {
    return {
      status: true,
      data: createCountry
    };
  }
}

/**
 * Get single country by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getCountry({ params }) {
  const { country_id } = params || {}
  return await Country.findOne({
    where: {
      country_id: country_id
    }
  });
}

/**
 * Update country by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { country_id } = params || {};
  const { name, code, status } = body || {};
  
  const foundCountry = await Country.findOne({
    where: {
      country_id: country_id
    }
  });

  if (!foundCountry) {
    throw new GenericError(400, '', `Country does not exist!`, foundCountry);
  }

  const now = moment.utc().toISOString();
  const [updateCountry] = await Country.update(
    {
      name: name,
      code: code,
      status: status,
      updated_at: now,
    },
    {
      where: {
        country_id: country_id,
      }
    }
  );

  return {
    status: true,
    data: updateCountry
  };
}

/**
 * Delete country by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deleteCountry({ params }) {
  const { country_id } = params || {};

  const foundCountry = await Country.findOne({
    where: {
      country_id: country_id
    }
  });

  if (!foundCountry) {
    throw new GenericError(400, '', `Country does not exist!`, foundCountry);
  }

  const now = moment.utc().toISOString();
  const deleteCountry = await Country.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        country_id: country_id,
      }
    }
  );

  return {
    status: true,
    data: deleteCountry
  };
}

module.exports = {
  getAll,
  getCountry,
  create,
  update,
  deleteCountry
};
