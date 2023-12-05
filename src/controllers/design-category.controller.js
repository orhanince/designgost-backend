const express = require('express');
const router = express.Router();
const designCategoryService = require('../services/design-category.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * Country Model
 * @typedef {object} Job
 * @property {string} user_id - Job id (UUID)
 * @property {string} name - Job name
 * @property {string} description - Job description
 */

/**
 * @typedef {object} GetJobList
 * @property {boolean} status - Service status
 * @property {number} count - Total user count
 * @property {array<Job>} count - Job list
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

module.exports = router;
