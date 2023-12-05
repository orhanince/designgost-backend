const { Tutorial } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const { default: slugify } = require('slugify');

/**
 * Get all tutorials
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'tutorial_id'],
    where: {
      status: true,
    },
  });

  const count = await Tutorial.count({
    where: options.where,
  });

  const data = await Tutorial.findAll({
    attributes: ['tutorial_id', 'design_category_id','name', 'slug','description','duration','embed', 'is_published', 'is_featured', 'status', 'created_at'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}
/**
 * Add new tutorial.
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ body }) {
  const { name, embed, description, designCategoryId, duration } = body || {};
  
  const foundTutorial = await Tutorial.count({
    where: {
      slug: slugify(name.toLowerCase(),'-'),
    },
  });

  if (!foundTutorial) {
    throw new GenericError(400, '', `Tutorial already exists!`, foundTutorial);
  }

  const now = moment.utc().toISOString();
  const createTutorial = await Tutorial.create({
    tutorial_id: uuidv4(),
    design_category_id: designCategoryId,
    name: name,
    slug: slugify(name.toLowerCase(),'-'),
    description: description,
    embed: embed,
    duration: duration,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createTutorial) {
    return {
      status: true,
      data: createTutorial
    };
  }
}

/**
 * Get single tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getTutorial({ params }) {
  const { tutorial_id } = params || {}
  return await Tutorial.findOne({
    where: {
      tutorial_id: tutorial_id
    }
  });
}

/**
 * Publish tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function publish({ params }) {
  const { tutorial_id } = params || {}
  const foundTutorial = await Tutorial.findOne({
    where: {
      tutorial_id: tutorial_id
    }
  });

  if (!foundTutorial) {
    throw new GenericError(400, '', `Tutorial does not exist!`, foundTutorial);
  }

  const now = moment.utc().toISOString();
  const [publishTutorial] = await Tutorial.update(
    {
      is_published: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        tutorial_id: tutorial_id,
      },
    }
  );

  return {
    status: true,
    data: publishTutorial
  };
}

/**
 * Set featured tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function setFeatured({ params }) {
  const { tutorial_id } = params || {}
  const foundTutorial = await Tutorial.findOne({
    where: {
      tutorial_id: tutorial_id
    }
  });

  if (!foundTutorial) {
    throw new GenericError(400, '', `Tutorial does not exist!`, foundTutorial);
  }

  const now = moment.utc().toISOString();
  const [setFeaturedTutorial] = await Tutorial.update(
    {
      is_featured: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        tutorial_id: tutorial_id,
      },
    }
  );

  return {
    status: true,
    data: setFeaturedTutorial
  };
}

/**
 * Update tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { tutorial_id } = params || {};
  const { design_category_id, name, description, embed, duration, is_published, is_featured, status } = body || {};
  
  const foundTutorial = await Tutorial.findOne({
    where: {
      tutorial_id: tutorial_id
    }
  });

  if (!foundTutorial) {
    throw new GenericError(400, '', `Tutorial does not exist!`, foundTutorial);
  }

  const now = moment.utc().toISOString();
  const [updateTutorial] = await Tutorial.update(
    {
      design_category_id:  design_category_id,
      name: name,
      slug: slugify(name.toLowerCase(),'-'),
      description: description,
      embed: embed,
      duration: duration,
      is_published: is_published,
      is_featured: is_featured,
      status: status,
      updated_at: now,
    },
    {
      where: {
        tutorial_id: tutorial_id,
      }
    }
  );

  return {
    status: true,
    data: updateTutorial
  };
}

/**
 * Delete tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deleteTutorial({ params }) {
  const { tutorial_id } = params || {};

  const foundTutorial = await Tutorial.findOne({
    where: {
      tutorial_id: tutorial_id
    }
  });

  if (!foundTutorial) {
    throw new GenericError(400, '', `Tutorial does not exist!`, foundTutorial);
  }

  const now = moment.utc().toISOString();
  const deleteTutorial = await Tutorial.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        tutorial_id: tutorial_id,
      }
    }
  );

  return {
    status: true,
    data: deleteTutorial
  };
}

module.exports = {
  getAll,
  getTutorial,
  create,
  setFeatured,
  publish,
  update,
  deleteTutorial
};
