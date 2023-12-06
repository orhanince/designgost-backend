const express = require('express');
const router = express.Router();
const podcastService = require('./../services/podcast.service');
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
    const result = await podcastService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * POST /podcast/
 * @summary Add new podcast
 * @tags Podcast
 * @return {CreatePodcastResponse} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await podcastService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{podcast_id}
 * @summary Get podcast by id.
 * @tags Podcast
 * @param {string} tutorial_id.path - Podcast id.
 * @return {GetPodcastResponse} 200 - success response - application/json
 */
router.get(
  '/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.getPodcast(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdatePodcastResponse
 * @property {boolean} status - Service status
 */


/**
 * PUT /{podcast_id}
 * @summary Update tutorial.
 * @tags Podcast
 * @param {string} tutorial_id.path - Tutorial id.
 * @return {UpdatePodcastResponse} 200 - success response - application/json
 */
router.put(
  '/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.update(req);
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
 * PUT /featured/{podcast_id}
 * @summary Publish podcast.
 * @tags Podcast
 * @param {string} tutorial_id.path - Podcast id.
 * @return {SetFeaturedResponse} 200 - success response - application/json
 */
router.put(
  '/featured/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.setFeatured(req);
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
 * PUT /publish/{podcast_id}
 * @summary Publish podcast.
 * @tags Podcast
 * @param {string} tutorial_id.path - Podcast id.
 * @return {PublishPodcastResponse} 200 - success response - application/json
 */
router.put(
  '/publish/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.publish(req);
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
  '/unpublish/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.unPublish(req);
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
 * DELETE /{podcast_id}
 * @summary Delete podcast.
 * @tags Podcast
 * @param {string} podcast_id.path - Tutorial id.
 * @return {podcast_id} 200 - success response - application/json
 */
router.delete(
  '/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.deletePodcast(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
