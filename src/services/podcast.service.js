const { Podcast } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const { default: slugify } = require('slugify');

/**
 * Get all podcasts
 * @param pagination
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
    attributes: ['podcast_id', 'name', 'slug','description','duration','embed','spotify_embed', 'person', 'person_career', 'is_published', 'is_featured', 'status', 'created_at'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}
/**
 * Add new podcast.
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ body }) {
  const { name, embed, description, spotify_embed, duration, person, person_career } = body || {};
  
  const foundPodcast = await Podcast.count({
    where: {
      slug: slugify(name.toLowerCase(),'-'),
    },
  });

  if (foundPodcast) {
    throw new GenericError(400, '', `Podcast already exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const createPodcast = await Podcast.create({
    podcast_id: uuidv4(),
    name: name,
    slug: slugify(name.toLowerCase(),'-'),
    description: description,
    embed: embed,
    spotify_embed: spotify_embed,
    duration: duration,
    person: person,
    person_career: person_career,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (spotify_embed) {
    return {
      status: true,
      data: createPodcast
    };
  }
}

/**
 * Get single podcast by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getPodcast({ params }) {
  const { podcast_id } = params || {}
  return await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });
}

/**
 * Publish podcast by id.
 * @param req
 * @returns {Promise<any>}
 */
async function publish({ params }) {
  const { podcast_id } = params || {}
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast does not exist!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const [publishPodcast] = await Podcast.update(
    {
      is_published: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        podcast_id: podcast_id,
      },
    }
  );

  return {
    status: true,
    data: publishPodcast
  };
}

/**
 * Publish podcast by id.
 * @param req
 * @returns {Promise<any>}
 */
async function unPublish({ params }) {
  const { podcast_id } = params || {}
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast does not exist!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const [unPublishPodcast] = await Podcast.update(
    {
      is_published: false,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        podcast_id: podcast_id,
      },
    }
  );

  return {
    status: true,
    data: unPublishPodcast
  };
}
/**
 * Set featured tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function setFeatured({ params }) {
  const { podcast_id } = params || {}
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast does not exist!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const [setFeaturedPodcast] = await Podcast.update(
    {
      is_featured: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        podcast_id: podcast_id,
      },
    }
  );

  return {
    status: true,
    data: setFeaturedPodcast
  };
}

/**
 * Update tutorial by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { podcast_id } = params || {};
  const { name, description, person, person_career, embed, spotify_embed, duration, is_published, is_featured, status } = body || {};
  
  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast does not exist!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const [updatePodcast] = await Podcast.update(
    {
      name: name,
      slug: slugify(name.toLowerCase(),'-'),
      description: description,
      person: person,
      person_career: person_career,
      embed: embed,
      spotify_embed: spotify_embed,
      duration: duration,
      is_published: is_published,
      is_featured: is_featured,
      status: status,
      updated_at: now,
    },
    {
      where: {
        podcast_id: podcast_id,
      }
    }
  );

  return {
    status: true,
    data: updatePodcast
  };
}

/**
 * Delete podcast by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deletePodcast({ params }) {
  const { podcast_id } = params || {};

  const foundPodcast = await Podcast.findOne({
    where: {
      podcast_id: podcast_id
    }
  });

  if (!foundPodcast) {
    throw new GenericError(400, '', `Podcast does not exist!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const deletePodcast = await Podcast.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        foundPodcast: foundPodcast,
      }
    }
  );

  return {
    status: true,
    data: deletePodcast
  };
}

module.exports = {
  getAll,
  getPodcast,
  create,
  setFeatured,
  publish,
  unPublish,
  update,
  deletePodcast
};
