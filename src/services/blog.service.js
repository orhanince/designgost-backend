const { Article } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const { default: slugify } = require('slugify');

/**
 * Get all articles
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'article_id'],
    where: {
      status: true,
    },
  });

  const count = await Article.count({
    where: options.where,
  });

  const data = await Article.findAll({
    attributes: ['article_id', 'name', 'slug','description','duration','embed','spotify_embed', 'person', 'person_career', 'is_published', 'is_featured', 'status', 'created_at'],
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
  
  const foundPodcast = await Article.count({
    where: {
      slug: slugify(name.toLowerCase(),'-'),
    },
  });

  if (foundPodcast) {
    throw new GenericError(400, '', `Article already exists!`, foundPodcast);
  }

  const now = moment.utc().toISOString();
  const createPodcast = await Article.create({
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
async function getArticle({ params }) {
  const { article_id } = params || {}
  return await Article.findOne({
    where: {
      podcastarticle_id_id: article_id
    }
  });
}

/**
 * Publish article by id.
 * @param req
 * @returns {Promise<any>}
 */
async function publish({ params }) {
  const { article_id } = params || {}
  const foundArticle = await Article.findOne({
    where: {
       article_id: article_id
    }
  });

  if (!foundArticle) {
    throw new GenericError(400, '', `Article does not exist!`, foundArticle);
  }

  const now = moment.utc().toISOString();
  const [publishArticle] = await Article.update(
    {
      is_published: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        article_id: article_id,
      },
    }
  );

  return {
    status: true,
    data: publishArticle
  };
}

/**
 * Publish article by id.
 * @param req
 * @returns {Promise<any>}
 */
async function unPublish({ params }) {
  const { article_id } = params || {}
  const foundArticle = await Article.findOne({
    where: {
        article_id: article_id
    }
  });

  if (!foundArticle) {
    throw new GenericError(400, '', `Article does not exist!`, foundArticle);
  }

  const now = moment.utc().toISOString();
  const [unPublishArticle] = await Article.update(
    {
      is_published: false,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        article_id: article_id,
      },
    }
  );

  return {
    status: true,
    data: unPublishArticle
  };
}
/**
 * Set featured article by id.
 * @param req
 * @returns {Promise<any>}
 */
async function setFeatured({ params }) {
  const { article_id } = params || {}
  const foundArticle = await Article.findOne({
    where: {
        article_id: article_id
    }
  });

  if (!foundArticle) {
    throw new GenericError(400, '', `Article does not exist!`, foundArticle);
  }

  const now = moment.utc().toISOString();
  const [setFeaturedArticle] = await Article.update(
    {
      is_featured: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        article_id: article_id,
      },
    }
  );

  return {
    status: true,
    data: setFeaturedArticle
  };
}

/**
 * Update article by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { article_id } = params || {};
  const { name, description, person, person_career, embed, spotify_embed, duration, is_published, is_featured, status } = body || {};
  
  const foundArticle = await Article.findOne({
    where: {
       article_id: article_id
    }
  });

  if (!foundArticle) {
    throw new GenericError(400, '', `Article does not exist!`, foundArticle);
  }

  const now = moment.utc().toISOString();
  const [updateArticle] = await Article.update(
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
        article_id: article_id,
      }
    }
  );

  return {
    status: true,
    data: updateArticle
  };
}

/**
 * Delete article by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deletePodcast({ params }) {
  const { article_id } = params || {};

  const foundArticle = await Article.findOne({
    where: {
       article_id: article_id
    }
  });

  if (!foundArticle) {
    throw new GenericError(400, '', `Article does not exist!`, foundArticle);
  }

  const now = moment.utc().toISOString();
  const deleteArticle = await Article.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        article_id: article_id,
      }
    }
  );

  return {
    status: true,
    data: deleteArticle
  };
}

module.exports = {
  getAll,
  getArticle,
  create,
  setFeatured,
  publish,
  unPublish,
  update,
  deletePodcast
};
