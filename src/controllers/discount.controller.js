const express = require('express');
const router = express.Router();
const discountService = require('./../services/discount.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
/**
 * Discount Model
 * @typedef {object} Discount
 * @property {string} discount_id - Discount id (UUID)
 * @property {string} name - Discount name
 * @property {string} code - Discount code
 * @property {string} card_text - Discount card text
 * @property {string} banner_text - Discount banner text
 * @property {string} url - Discount url
 * @property {boolean} is_published - Discount is_published
 * @property {boolean} is_featured - Discount is_featured
 */

/**
 * @typedef {object} GetDiscountList
 * @property {boolean} status - Service status
 * @property {number} count - Discount user count
 * @property {array<Discount>} count - Discount list
 */

/**
 * @typedef {object} GetDiscountResponse
 * @property {boolean} status - Service status
 * @property {number} data - Discount data
 */

/**
 * @typedef {object} CreateDiscountResponse
 * @property {boolean} status - Service status
 * @property {number} data - Discount data
 */

/**
 * @typedef {object} GeneralResponse
 * @property {boolean} status - Service status
 */

/**
 * GET /
 * @summary Get discount list.
 * @tags User
 * @return {GetDiscountList} 200 - success response - application/json
 */
router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
const discountService = require('./../services/discount.service');
    const result = await discountService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * POST /
 * @summary Add new discount
 * @tags Discount
 * @return {CreateArticleResponse} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await discountService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{discount_id}
 * @summary Get discount by id.
 * @tags Discount
 * @param {string} discount_id.path - Podcast id.
 * @return {GetArticleResponse} 200 - success response - application/json
 */
router.get(
  '/:discount_id',
  validatorMiddleware(param('discount_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await discountService.getPodcast(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * PUT /{discount_id}
 * @summary Update discount
 * @tags Podcast
 * @param {string} discount_id.path - Tutorial id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.put(
  '/:discount_id',
  validatorMiddleware(param('discount_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await discountService.update(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * PUT /featured/{discount_id}
 * @summary Publish discount
 * @tags Discount
 * @param {string} discount_id.path - Podcast id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.put(
  '/featured/:discount_id',
  validatorMiddleware(param('discount_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await discountService.setFeatured(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * PUT /publish/{discount_id}
 * @summary Publish discount
 * @tags Discount
 * @param {string} tutorial_id.path - Discount id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.put(
  '/publish/:article_id',
  validatorMiddleware(param('article_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await discountService.publish(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * PUT /publish/{discount_id}
 * @summary Publish podcast.
 * @tags Discount
 * @param {string} tutorial_id.path - Discount id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.put(
  '/unpublish/:discount_id',
  validatorMiddleware(param('discount_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await discountService.unPublish(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * DELETE /{discount_id}
 * @summary Delete discount
 * @tags Discount
 * @param {string} discount_id.path - Discount id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.delete(
  '/:discount_id',
  validatorMiddleware(param('discount_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await discountService.deleteDiscount(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
