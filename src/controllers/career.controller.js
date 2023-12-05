const express = require('express');
const router = express.Router();
const jobService = require('../services/career.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * Job Model
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

router.get('/get-all', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await jobService.getOldAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});
/**
 * GET /job/
 * @summary Get all jobs.
 * @tags Job
 * @return {GetJobList} 200 - success response - application/json
 */
router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await jobService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * GET /user/{job_id}
 * @summary Get job by id.
 * @tags Job
 * 
 * @return {GetTodoList} 200 - success response - application/json
 */
router.get(
  '/:job_id',
  paginationMiddleware(),
  async (req, res, next) => {
    try {
      const result = await jobService.getByID({ ID: req.params.job_id });
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdateJobResponse
 * @property {string} status - true
 */

/**
 * PUT /job/{job_id}
 * @summary Update job.
 * @tags Job
 * @security bearerAuth
 * @param {string} job_id.path - job id.
 * @return {UpdateJobResponse} 200 - success response - application/json
 */
router.put(
  '/:job_id',
  ...auth(),
  validatorMiddleware(param('job_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await jobService.update(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
