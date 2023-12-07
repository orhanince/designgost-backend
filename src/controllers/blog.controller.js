const express = require('express');
const router = express.Router();
const blogService = require('./../services/blog.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
/**
 * Article Model
 * @typedef {object} Article
 * @property {string} article_id - Podcast id (UUID)
 * @property {string} name - Podcast name
 * @property {string} link - Podcast link
 */

/**
 * @typedef {object} GetArticleList
 * @property {boolean} status - Service status
 * @property {number} count - Article user count
 * @property {array<Article>} count - Article list
 */

/**
 * @typedef {object} GetArticleResponse
 * @property {boolean} status - Service status
 * @property {number} data - Podcast data
 */



/**
 * GET /
 * @summary Get article list.
 * @tags User
 * @return {GetArticleList} 200 - success response - application/json
 */
router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await blogService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * POST /blog/
 * @summary Add new article
 * @tags Podcast
 * @return {CreateArticleResponse} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await blogService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{article_id}
 * @summary Get podcast by id.
 * @tags Podcast
 * @param {string} article_id.path - Podcast id.
 * @return {GetPodcastResponse} 200 - success response - application/json
 */
router.get(
  '/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await blogService.getPodcast(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdateArticleResponse
 * @property {boolean} status - Service status
 */


/**
 * PUT /{article_id}
 * @summary Update article
 * @tags Podcast
 * @param {string} article_id.path - Tutorial id.
 * @return {UpdateArticleResponse} 200 - success response - application/json
 */
router.put(
  '/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await blogService.update(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} SetFeaturedResponse
 * @property {string} status - true
 */

/**
 * PUT /featured/{article_id}
 * @summary Publish article.
 * @tags Podcast
 * @param {string} article_id.path - Podcast id.
 * @return {SetFeaturedResponse} 200 - success response - application/json
 */
router.put(
  '/featured/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await blogService.setFeatured(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} PublishPodcastResponse
 * @property {boolean} status - Service status
 */

/**
 * PUT /publish/{article_id}
 * @summary Publish article.
 * @tags Article
 * @param {string} tutorial_id.path - Article id.
 * @return {PublishPodcastResponse} 200 - success response - application/json
 */
router.put(
  '/publish/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await blogService.publish(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UnPublishPodcastResponse
 * @property {boolean} status - Service status
 */

/**
 * PUT /publish/{podcast_id}
 * @summary Publish podcast.
 * @tags Podcast
 * @param {string} tutorial_id.path - Podcast id.
 * @return {UnPublishPodcastResponse} 200 - success response - application/json
 */
router.put(
  '/unpublish/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await blogService.unPublish(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);
/**
 * @typedef {object} DeletePodcastResponse
 * @property {boolean} status - Service status
 */

/**
 * DELETE /{article_id}
 * @summary Delete article.
 * @tags Podcast
 * @param {string} article_id.path - Tutorial id.
 * @return {podcast_id} 200 - success response - application/json
 */
router.delete(
  '/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await blogService.deletePodcast(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
