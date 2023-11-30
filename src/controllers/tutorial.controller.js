const express = require('express');
const router = express.Router();
const userService = require('./../services/user.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { param } = require('express-validator');
const auth = require('../middlewares/auth');
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
 * GET /user/
 * @summary Get all users.
 * @tags User
 * @security bearerAuth
 * @return {GetUserList} 200 - success response - application/json
 */
router.get('/', ...auth(), paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await userService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * GET /user/{user_id}
 * @summary Get user by id.
 * @tags User
 * @security bearerAuth
 * @return {GetTodoList} 200 - success response - application/json
 */
router.get(
  '/:user_id',
  ...auth(),
  paginationMiddleware(),
  async (req, res, next) => {
    try {
      const result = await userService.getUser({ user_id: req.AUTH.user_id });
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdateUserResponse
 * @property {string} status - true
 */

/**
 * PUT /user/{user_id}
 * @summary Update user.
 * @tags User
 * @param {string} user_id.path - user id.
 * @return {UpdateUserResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.put(
  '/:user_id',
  ...auth(),
  validatorMiddleware(param('user_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await userService.updateUser(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
