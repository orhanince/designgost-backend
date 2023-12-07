const healthy = require('./healthy.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const careerController = require('./career.controller');
const podcastController = require('./podcast.controller');
const tutorialController = require('./tutorial.controller');
const countryController = require('./country.controller');
const newsletterController = require('./newsletter.controller');
const designCategoryController = require('./design-category.controller');
const roleController = require('./role.controller');
/**
 *
 * @param app {Application}
 */
module.exports = (app) => {
  app.use('/', healthy);
  app.use('/auth', authController);
  app.use('/job', careerController);
  app.use('/podcast', podcastController);
  app.use('/role', roleController);
  app.use('/tutorial', tutorialController);
  app.use('/user', userController);
  app.use('/country', countryController);
  app.use('/newsletter', newsletterController);
  app.use('/design-category',designCategoryController);
};
