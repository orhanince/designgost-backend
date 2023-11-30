const healthy = require('./healthy.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const careerController = require('./career.controller');
const podcastController = require('./podcast.controller');
const tutorialController = require('./tutorial.controller');
/**
 *
 * @param app {Application}
 */
module.exports = (app) => {
  app.use('/', healthy);
  app.use('/auth', authController);
  app.use('/job', careerController);
  app.use('/podcast', podcastController);
  app.use('/tutorial', tutorialController);
  app.use('/user', userController);
};
