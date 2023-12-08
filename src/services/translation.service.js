const { Translation } = require('./../models');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');

/**
 * Update single user form database.
 * @param req
 * @returns {Promise<any>}
 */
async function create() {
    const now = moment.utc().toISOString();
    const createTranslation = await Translation.create({
      translation_id: uuidv4(),
      content_id: uuidv4(),
      value: JSON.stringify({
        "slug": "testing-goes-here",
        "description": "testing goes here again!"
      }),
      status: 1,
        created_at: now,
        updated_at: now,
    });
    if (createTranslation) {
        return {
          status: true,
          data: createTranslation
        };
      }
}

module.exports = {
  create
};
