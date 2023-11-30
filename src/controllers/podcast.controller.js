const express = require('express');
const router = express.Router();
const podcastService = require('../services/podcast.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * Podcast Model
 * @typedef {object} Podcast
 * @property {string} podcast_id - Podcast id (UUID)
 * @property {string} name - Podcast name
 * @property {string} link - Podcast link
 */

/**
 * @typedef {object} GetPodcastList
 * @property {boolean} status - Service status
 * @property {number} count - Total user count
 * @property {array<Podcast>} count - Podcast list
 */

/**
 * GET /podcast/
 * @summary Get all podcasts.
 * @tags Podcast
 * @return {GetPodcastList} 200 - success response - application/json
 */
router.get('/',paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await podcastService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * GET /podcast/{podcast_id}
 * @summary Get podcast by id.
 * @tags Podcast
 * @return {GetTodoList} 200 - success response - application/json
 */
router.get(
  '/:user_id',
  paginationMiddleware(),
  async (req, res, next) => {
    try {
      const result = await podcastService.getByID({ ID: req.params.podcast_id });
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * POST /podcast/{podcast_id}
 * @summary Update podcast.
 * @tags Podcast
 * @param {string} podcast_id.path - Podcast id.
 * @return {UpdatePodcastResponse} 200 - success response - application/json
 * @security bearerAuth
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
 * @typedef {object} UpdatePodcastResponse
 * @property {string} status - true
 */

/**
 * PUT /podcast/{podcast_id}
 * @summary Update podcast.
 * @tags Podcast
 * @param {string} podcast_id.path - Podcast id.
 * @return {UpdatePodcastResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.put(
  '/:user_id',
  ...auth(),
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
 * PUT /podcast/publish/{podcast_id}
 * @summary Publish podcast.
 * @tags Podcast
 * @param {string} podcast_id.path - Podcast id.
 * @return {UpdatePodcastResponse} 200 - success response - application/json
 * @security bearerAuth
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
 * PUT /podcast/featured/{podcast_id}
 * @summary Set featured podcast.
 * @tags Podcast
 * @param {string} podcast_id.path - Podcast id.
 * @return {UpdatePodcastResponse} 200 - success response - application/json
 * @security bearerAuth
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
 * PUT /podcast/featured/{podcast_id}
 * @summary Set featured podcast.
 * @tags Podcast
 * @param {string} podcast_id.path - Podcast id.
 * @return {UpdatePodcastResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.delete(
  '/featured/:podcast_id',
  validatorMiddleware(param('podcast_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await podcastService.softDelete(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
