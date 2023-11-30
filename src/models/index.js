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

module.exports = {
  RequestToken,
  User,
  Podcast,
  Slug,
  Translation,
  DesignCategory
};
