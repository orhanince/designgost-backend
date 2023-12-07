const express = require('express');
const router = express.Router();
const roleService = require('./../services/role.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
/**
 * Role Model
 * @typedef {object} Role
 * @property {string} role_id - Role id (UUID)
 * @property {string} name - Role name
 * @property {string} link - Role link
 */

/**
 * @typedef {object} GetRoleList
 * @property {boolean} status - Service status
 * @property {number} count - Total role count
 * @property {array<Tutorial>} count - Role list
 */

/**
 * @typedef {object} GetRoleResponse
 * @property {boolean} status - Service status
 * @property {number} data - Podcast data
 */

/**
 * @typedef {object} CreateRoleResponse
 * @property {boolean} status - Service status
 * @property {number} data - Role data
 */

/**
 * @typedef {object} GeneralResponse
 * @property {boolean} status - Service status
 */



/**
 * GET /
 * @summary Get all podcasts.
 * @tags User
 * @return {GetRoleList} 200 - success response - application/json
 */
router.get('/', paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await roleService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * POST /role/
 * @summary Add new role
 * @tags Role
 * @return {CreateRoleResponse} 200 - success response - application/json
 */
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await roleService.create(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * GET /{role_id}
 * @summary Get role by id.
 * @tags Role
 * @param {string} role_id.path - Role id.
 * @return {GetRoleResponse} 200 - success response - application/json
 */
router.get(
  '/:role_id',
  validatorMiddleware(param('role_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await roleService.getRole(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);


/**
 * PUT /{role_id}
 * @summary Update tutorial.
 * @tags Role
 * @param {string} tutorial_id.path - Role id.
 * @return {GeneralResponse} 200 - success response - application/json
 */
router.put(
  '/:role_id',
  validatorMiddleware(param('role_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await roleService.update(req);
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
 * DELETE /{role_id}
 * @summary Delete podcast.
 * @tags Role
 * @param {string} podcast_id.path - Tutorial id.
 * @return {podcast_id} 200 - success response - application/json
 */
router.delete(
  '/:role_id',
  validatorMiddleware(param('role_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await roleService.deleteRole(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
