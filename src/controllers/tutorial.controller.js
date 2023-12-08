const express = require('express');
const router = express.Router();
const tutorialService = require('./../services/tutorial.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
/**
 * Tutorial Model
 * @typedef {object} Tutorial
 * @property {string} tutorial_id - Tutorial id (UUID)
 * @property {string} name - Tutorial name
 * @property {string} link - Tutorial link
 */

/**
 * @typedef {object} GetTutorialList
 * @property {boolean} status - Service status
 * @property {number} count - Total user count
 * @property {array<Tutorial>} count - Tutorial list
 */

/**
 * @typedef {object} GetTutorialResponse
 * @property {boolean} status - Service status
 * @property {number} data - Tutorial data
 */



/**
 * GET /
 * @summary Get all tutorials.
 * @tags User
 * @return {GetTutorialList} 200 - success response - application/json
 */
router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await tutorialService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * POST /tutorial/
 * @summary Add new tutorial
 * @tags Podcast
 * @return {CreateTutorialResponse} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await tutorialService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{tutorial_id}
 * @summary Get tutorial by id.
 * @tags Tutorial
 * @param {string} tutorial_id.path - Tutorial id.
 * @return {GetTutorialResponse} 200 - success response - application/json
 */
router.get(
  '/:tutorial_id',
  validatorMiddleware(param('tutorial_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await tutorialService.getTutorial(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdateTutorialResponse
 * @property {boolean} status - Service status
 */


/**
 * PUT /{tutorial_id}
 * @summary Update tutorial.
 * @tags Tutorial
 * @param {string} tutorial_id.path - Tutorial id.
 * @return {UpdateTutorialResponse} 200 - success response - application/json
 */
router.put(
  '/:tutorial_id',
  validatorMiddleware(param('tutorial_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await tutorialService.update(req);
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
 * PUT /featured/{tutorial_id}
 * @summary Publish tutorial.
 * @tags Tutorial
 * @param {string} tutorial_id.path - Tutorial id.
 * @return {SetFeaturedResponse} 200 - success response - application/json
 */
router.put(
  '/featured/:tutorial_id',
  validatorMiddleware(param('tutorial_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await tutorialService.setFeatured(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} PublishTutorialResponse
 * @property {boolean} status - Service status
 */

/**
 * PUT /publish/{tutorial_id}
 * @summary Publish tutorial.
 * @tags Tutorial
 * @param {string} tutorial_id.path - Tutorial id.
 * @return {PublishTutorialResponse} 200 - success response - application/json
 */
router.put(
  '/publish/:tutorial_id',
  validatorMiddleware(param('tutorial_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await tutorialService.publish(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} DeleteTutorialResponse
 * @property {boolean} status - Service status
 */

/**
 * DELETE /{tutorial_id}
 * @summary Delete tutorial.
 * @tags Tutorial
 * @param {string} tutorial_id.path - Tutorial id.
 * @return {DeleteTutorialResponse} 200 - success response - application/json
 */
router.delete(
  '/:tutorial_id',
  validatorMiddleware(param('tutorial_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await tutorialService.deleteTutorial(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
