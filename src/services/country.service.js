const _ = require('lodash');
const { Country } = require('../models');
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
    const country = await sequelizeClient.query('SELECT * FROM data_countries');
    const countryTranlation = await sequelizeClient.query('SELECT * FROM data_country_translations');
    const allCountry=[];
    for (let index = 0; index < countryTranlation[0].length; index++) {
        const element = countryTranlation[0][index];
        const elementTwo = country[0][index];
        console.log('element', element);
        console.log('elementTwo', elementTwo);
        element.code = elementTwo.code;
        allCountry.push(element);
    }
    
    for await (const c of allCountry) {
         const now = moment.utc().toISOString();
         const createCountry = await Country.create({
         country_id: uuidv4(),
         name: c.title,
         code: c.code,
         status: 1,
         created_at: now,
         updated_at: now,
         });
         console.log('createCountry', createCountry);
       }
}


module.exports = {
  getAll
};
