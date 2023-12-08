const { DesignCategory } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');

/**
 * Get all design categories.
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'design_category_id'],
    where: {
      status: true,
    },
  });

  const count = await DesignCategory.count({
    where: options.where,
  });

  const data = await DesignCategory.findAll({
    attributes: ['design_category_id', 'name', 'short_code'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}
/**
 * Add new design category.
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ body }) {
  const { name, short_code } = body || {};
  
  const foundPodcast = await DesignCategory.count({
    where: {
      short_code: short_code,
    },
  });

  if (foundPodcast) {
    throw new GenericError(400, '', `DesignCategory already exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const createDesignCategory = await DesignCategory.create({
    design_category_id: uuidv4(),
    name: name,
    short_code: short_code,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createDesignCategory) {
    return {
      status: true,
      data: createDesignCategory
    };
  }
}

/**
 * Get single design category by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getDesignCategory({ params }) {
  const { design_category_id } = params || {}
  return await DesignCategory.findOne({
    where: {
      design_category_id: design_category_id
    }
  });
}


/**
 * Update design category by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { design_category_id } = params || {};
  const { name, short_code, status } = body || {};
  
  const foundPodcast = await DesignCategory.findOne({
    where: {
      design_category_id: design_category_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `DesignCategory does not exist!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const [updateDesignCategory] = await DesignCategory.update(
    {
      name: name,
      short_code: short_code,
      status: status,
      updated_at: now,
    },
    {
      where: {
        design_category_id: design_category_id,
      }
    }
  );

  return {
    status: true,
    data: updateDesignCategory
  };
}

/**
 * Delete design category by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deleteDesignCategory({ params }) {
  const { design_category_id } = params || {};

  const foundDesignCategory = await DesignCategory.findOne({
    where: {
      design_category_id: design_category_id
    }
  });

  if (!foundDesignCategory) {
    throw new GenericError(400, '', `DesignCategory does not exist!`, foundDesignCategory);
  }

  const now = moment.utc().toISOString();
  const deleteDesignCategory = await DesignCategory.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        design_category_id: design_category_id,
      }
    }
  );

  return {
    status: true,
    data: deleteDesignCategory
  };
}

module.exports = {
  getAll,
  getDesignCategory,
  create,
  update,
  deleteDesignCategory
};
