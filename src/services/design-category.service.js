const _ = require('lodash');
const { DesignCategory } = require('../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const cryptoService = require('./crypto.service');
const jwt = require('../utils/jwt');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
const sequelizeClient = require('./../utils/sequelize-client');
const { default: slugify } = require('slugify');
/**
 * Get all countries
 * @param pagination
 * @param AUTH
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll() {
    const videoCats = await sequelizeClient.query('SELECT * FROM videocat_translations');
    console.log('videocats', videoCats);

    for await (const vc of videoCats[0]) {
      const now = moment.utc().toISOString();
      const createDesignCategory = await DesignCategory.create({
      design_category_id: uuidv4(),
      name: vc.title,
      short_code: vc.first_letters,
      status: 1,
      created_at: now,
      updated_at: now,
      });
      console.log('createDesignCategory', createDesignCategory);
    }
}


module.exports = {
  getAll
};
