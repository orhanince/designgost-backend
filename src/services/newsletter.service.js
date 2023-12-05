const _ = require('lodash');
const { Newsletter } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const cryptoService = require('./crypto.service');
const jwt = require('../utils/jwt');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const sequelizeClient = require('./../utils/sequelize-client');
const { default: slugify } = require('slugify');
/**
 * Get all users
 * @param pagination
 * @param AUTH
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll() {
  const newsletterLists = await sequelizeClient.query('SELECT * FROM newsletter_lists');
  console.log('newsletter-list', newsletterLists[0]);

  for await (const n of newsletterLists[0]) {
     const now = moment.utc().toISOString();
     
     const createNewsletter = await Newsletter.create({
     newsletter_id: uuidv4(),
     first_name: n.fname,
     last_name: n.lname,
     email: n.email,
     interests: n.interests,
     status: 1,
     created_at: now,
     updated_at: now,
     });
     console.log('createNewsletter', createNewsletter);
  };
  return {
    status: true,
    data: 1
  };

}

module.exports = {
  getAll
};
