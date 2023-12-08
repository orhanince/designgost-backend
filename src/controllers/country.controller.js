const express = require('express');
const router = express.Router();
const countryService = require('../services/country.service');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const validatorMiddleware = require('../middlewares/validator-middleware');
const { param } = require('express-validator');
/**
 * Country Model
 * @typedef {object} Country
 * @property {string} country_id - Country id (UUID)
 * @property {string} name - Country name
 * @property {string} code - Country code
 */

/**
 * @typedef {object} GetCountryList
 * @property {boolean} status - Service status
 * @property {number} count - Total country count
 * @property {array<Country>} count - Country list
 */

/**
 * @typedef {object} CreateCountryResponse
 * @property {boolean} status - Service status
 * @property {Country} data - Country data
 */

/**
 * @typedef {object} GetCountryResponse
 * @property {boolean} status - Service status
 * @property {Country} data - Country data
 */

/**
 * @typedef {object} GeneralResponse
 * @property {boolean} status - Service status
 */

router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await countryService.getAll(req);
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
      const result = await countryService.create(req);
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
  '/:country_id',
  validatorMiddleware(param('country_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await countryService.getCountry(req);
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
  '/:country_id',
  validatorMiddleware(param('country_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await countryService.update(req);
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
  '/:country_id',
  validatorMiddleware(param('country_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await countryService.deleteCountry(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
