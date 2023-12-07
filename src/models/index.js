'use strict';
/*
 * how to use!
 *
 * for example Customer model in models/customer.js
 *
 * const Customer = required('./models/customer.js');
 *
 * module.exports = {
 *   Customer,
 *   ...OtherModels
 * };
 */
const { RequestToken } = require('./request-token.js');
const { User } = require('./user');
const { Podcast } = require('./podcast.js');
const { Translation } = require('./translation.js');
const { Slug } = require('./slug.js');
const { DesignCategory } = require('./design-category.js');
const { Career } = require('./career.js');
const { WorkType } = require('./work-type.js');
const { Profession } = require('./profession.js');
const { Country } = require('./country.js');
const { Newsletter } = require('./newsletter.js');
const { Tutorial } = require('./tutorial.js');
const { Article } = require('./article.js');
module.exports = {
  Article,
  Career,
  WorkType,
  Profession,
  RequestToken,
  User,
  Podcast,
  Slug,
  Translation,
  DesignCategory,
  Country,
  Newsletter,
  Tutorial
};
