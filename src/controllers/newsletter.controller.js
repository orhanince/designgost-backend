const express = require('express');
const router = express.Router();
const newsletterService = require('../services/newsletter.service');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const validatorMiddleware = require('../middlewares/validator-middleware');
const { param } = require('express-validator');
/**
 * Newsletter Model
 * @typedef {object} Newsletter
 * @property {string} newsletter_id - Newsletter id (UUID)
 * @property {string} name - Newsletter name
 * @property {string} code - Newsletter code
 */

/**
 * @typedef {object} GetCountryList
 * @property {boolean} status - Service status
 * @property {number} count - Total newsletter count
 * @property {array<Newsletter>} count - Newsletter list
 */

/**
 * @typedef {object} CreateCountryResponse
 * @property {boolean} status - Service status
 * @property {Newsletter} data - Newsletter data
 */

/**
 * @typedef {object} GetCountryResponse
 * @property {boolean} status - Service status
 * @property {Newsletter} data - Newsletter data
 */

/**
 * @typedef {object} GeneralResponse
 * @property {boolean} status - Service status
 */

router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await newsletterService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});


/**
 * POST /country/
 * @summary Add new country
 * @tags Country
 * @return {CreateCountryResponse} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await newsletterService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{country_id}
 * @summary Get country by id.
 * @tags Country
 * @param {string} country_id.path - Country id.
 * @return {GetCountryResponse} 200 - success response - application/json
 */
router.get(
  '/:newsletter_id',
  validatorMiddleware(param('newsletter_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await newsletterService.getNewsletter(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);


/**
 * PUT /{country_id}
 * @summary Update country
 * @tags Country
 * @param {string} country_id.path - Tutorial id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.put(
  '/:newsletter_id',
  validatorMiddleware(param('newsletter_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await newsletterService.update(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * DELETE /{country_id}
 * @summary Delete country.
 * @tags Podcast
 * @param {string} country_id.path - Country id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.delete(
  '/:newsletter_id',
  validatorMiddleware(param('newsletter_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await newsletterService.deleteNewsletter(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
