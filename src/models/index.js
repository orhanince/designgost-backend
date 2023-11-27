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
module.exports = {
  RequestToken,
  User,
};
