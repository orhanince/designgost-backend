const express = require('express');
const router = express.Router();
const designCategoryService = require('./../services/design-category.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
/**
 * DesignCategory Model
 * @typedef {object} Article
 * @property {string} design_category_id - Podcast id (UUID)
 * @property {string} name - DesignCategory name
 */

/**
 * @typedef {object} GetDesignCategoryList
 * @property {boolean} status - Service status
 * @property {number} count - DesignCategory user count
 * @property {array<Article>} count - DesignCategory list
 */

/**
 * @typedef {object} GetDesignCategoryResponse
 * @property {boolean} status - Service status
 * @property {number} data - Podcast data
 */



/**
 * GET /
 * @summary Get design category list.
 * @tags User
 * @return {GetDesignCategoryList} 200 - success response - application/json
 */
router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await designCategoryService.getAll(req);
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
 * @return {CreateDesignCategory} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await designCategoryService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{design_category_id}
 * @summary Get podcast by id.
 * @tags Podcast
 * @param {string} tutorial_id.path - Podcast id.
 * @return {GetDesignCategoryResponse} 200 - success response - application/json
 */
router.get(
  '/:design_category_id',
  validatorMiddleware(param('design_category_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await designCategoryService.getDesignCategory(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdateDesignCategoryResponse
 * @property {boolean} status - Service status
 */


/**
 * PUT /{design_category_id}
 * @summary Update design category.
 * @tags Podcast
 * @param {string} design_category_id.path - Tutorial id.
 * @return {UpdateDesignCategoryResponse} 200 - success response - application/json
 */
router.put(
  '/:design_category_id',
  validatorMiddleware(param('design_category_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await designCategoryService.update(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);


/**
 * @typedef {object} DeleteDesignCategoryResponse
 * @property {boolean} status - Service status
 */

/**
 * DELETE /{design_category_id}
 * @summary Delete design category.
 * @tags Podcast
 * @param {string} design_category_id.path - Tutorial id.
 * @return {DeleteDesignCategoryResponse} 200 - success response - application/json
 */
router.delete(
  '/:design_category_id',
  validatorMiddleware(param('design_category_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await designCategoryService.deleteDesignCategory(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
