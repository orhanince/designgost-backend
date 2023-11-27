const healthy = require('./healthy.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
/**
 *
 * @param app {Application}
 */
module.exports = (app) => {
  app.use('/', healthy);
  app.use('/auth', authController);
  app.use('/user', userController);
};
