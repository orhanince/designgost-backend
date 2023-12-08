const { Role } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');

/**
 * Get all roles
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'role_id'],
    where: {
      status: true,
    },
  });

  const count = await Role.count({
    where: options.where,
  });

  const data = await Role.findAll({
    attributes: ['role_id', 'name', 'code','status'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Add new role
 * @param {string} name 
 * @param {string} code 
 * @returns 
 */
async function create({ body }) {
  const { name } = body || {};
  const foundRole = await Role.count({
    where: {
      code: name.toLowerCase(),
    },
  });

  if (foundRole) {
    throw new GenericError(400, '', `Role already exists!`, foundRole);
  }

  const now = moment.utc().toISOString();
  const createRole = await Role.create({
    role_id: uuidv4(),
    name: name,
    code: name.toLowerCase(),
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createRole) {
    return {
      status: true,
      data: createRole
    };
  }
}

/**
 * Get single role by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getRole({ params }) {
  const { role_id } = params || {}
  return await Role.findOne({
    where: {
      role_id: role_id
    }
  });
}

/**
 * Update role by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { role_id } = params || {};
  const { name, code, status } = body || {};
  
  const foundRole = await Role.findOne({
    where: {
        role_id: role_id
    }
  });

  if (!foundRole) {
    throw new GenericError(400, '', `Role does not exist!`, foundRole);
  }

  const now = moment.utc().toISOString();
  const [updateRole] = await Role.update(
    {
      name: name,
      code: code,
      status: status,
      updated_at: now,
    },
    {
      where: {
        role_id: role_id,
      }
    }
  );

  return {
    status: true,
    data: updateRole
  };
}

/**
 * Delete role by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deleteRole({ params }) {
  const { role_id } = params || {};

  const foundRole = await Role.findOne({
    where: {
        role_id: role_id
    }
  });

  if (!foundRole) {
    throw new GenericError(400, '', `Role does not exist!`, foundRole);
  }

  const now = moment.utc().toISOString();
  const deleteRole = await Role.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        role_id: role_id,
      }
    }
  );

  return {
    status: true,
    data: deleteRole
  };
}

module.exports = {
  getAll,
  getRole,
  create,
  update,
  deleteRole
};
