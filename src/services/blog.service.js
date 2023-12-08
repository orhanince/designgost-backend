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
 * Add new article.
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ body }) {
  const { name, design_category_id, content, cover_img, word_count, read_time } = body || {};
  
  const foundPodcast = await Article.count({
    where: {
      slug: slugify(name.toLowerCase(),'-'),
    },
  });

  if (foundPodcast) {
    throw new GenericError(400, '', `Article already exists!`, foundPodcast);
  }
  const now = moment.utc().toISOString();
  const createArticle = await Article.create({
    article_id: uuidv4(),
    design_category_id: design_category_id,
    user_id: uuidv4(),
    name: name,
    slug: slugify(name.toLowerCase(),'-'),
    content: content,
    cover_img: cover_img,
    word_count: word_count,
    read_time: read_time,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createArticle) {
    return {
      status: true,
      data: createArticle
    };
  }
}

/**
 * Get single article by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getArticle({ params }) {
  const { article_id } = params || {}
  return await Article.findOne({
    where: {
      article_id: article_id
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
  const { name, design_category_id, content, cover_img, word_count, read_time, is_published, is_featured, status  } = body || {};
  
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
      design_category_id: design_category_id,
      user_id: uuidv4(),
      name: name,
      slug: slugify(name.toLowerCase(),'-'),
      content: content,
      cover_img: cover_img,
      word_count: word_count,
      read_time: read_time,
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
async function deleteArticle({ params }) {
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
  deleteArticle
};
