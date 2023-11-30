const slugify = require('slugify');
const { Podcast } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
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
    likeColumns: ['id', 'podcast_id'],
    where: {
      status: true,
    },
  });

  const count = await Podcast.count({
    where: options.where,
  });

  const data = await Podcast.findAll({
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Create new podcast
 * @param {string} name
 * @param {string} language
 * @param {string} personName
 * @param {string} iframe
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ body }) {
  const { name, language, personName, iframe } = body || {};
  const now = moment.utc().toISOString();
  const createPodcast = await Podcast.create({
    podcast_id: uuidv4(),
    name: name,
    slug: slugify(name, '_'),
    language: language,
    person_name: personName,
    iframe: iframe,
    status: 1,
    created_at: now,
    updated_at: now,
  });
  
  if (createPodcast) {
    return {
      status: true,
      data: createPodcast
    };
  }
}

/**
 * Publish the podcast.
 * @param {string} name
 * @param {string} language
 * @param {string} personName
 * @param {string} iframe
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function publish({ params }) {
  const { podcast_id } = params || {};
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast not exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const publishPodcast = await Podcast.update({
    is_published: true,
    status: 1,
    updated_at: now
  }, {
    where: {
      podcast_id: podcast_id
    }
  });
  
  if (publishPodcast) {
    return {
      status: true,
      data: publishPodcast
    };
  }
}

/**
 * Publish the podcast.
 * @param {string} name
 * @param {string} language
 * @param {string} personName
 * @param {string} iframe
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function setFeatured({ params }) {
  const { podcast_id } = params || {};
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast not exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const setFeaturedPodcast = await Podcast.update({
    is_featured: true,
    status: 1,
    updated_at: now
  }, {
    where: {
      podcast_id: podcast_id
    }
  });
  
  if (setFeaturedPodcast) {
    return {
      status: true,
      data: setFeaturedPodcast
    };
  }
}

/**
 * Update the podcast.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ body, params }) {
  const { podcast_id } = params || {};
  const { name, personName, iframe } = body || {};
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast not exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const updatePodcast = await Podcast.update({
    name: name, 
    slug: slugify(name, '_'),
    person_name: personName,
    iframe: iframe,
    status: 1,
    updated_at: now
  }, {
    where: {
      podcast_id: podcast_id
    }
  });

  if (updatePodcast) {
    return {
      status: true,
      data: updatePodcast
    };
  }
}

/**
 * Delete the podcast.
 * @param req
 * @returns {Promise<any>}
 */
async function softDelete({ params }) {
  const { podcast_id } = params || {};
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast not exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const softDeletePodcast = await Podcast.update({
    is_published: false,
    status: 0,
    deleted_at: now,
  }, {
    where: {
      podcast_id: podcast_id
    }
  });

  if (softDeletePodcast) {
    return {
      status: true,
      data: softDeletePodcast
    };
  }
}


module.exports = {
  getAll,
  create,
  publish,
  setFeatured,
  update,
  softDelete
};
