const { Discount } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');

/**
 * Get all discounts
 * @param pagination
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'discount_id'],
    where: {
      status: true,
    },
  });

  const count = await Discount.count({
    where: options.where,
  });

  const data = await Discount.findAll({
    attributes: ['discount_id', 'name', 'position','code','card_text','banner_text','url', 'is_published', 'is_featured', 'status','published_start_date', 'published_end_date'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Add new discount
 * @param {string} name
 * @param {string} position
 * @param {string} code
 * @param {string} card_text
 * @param {string} banner_text
 * @param {string} url
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function create({ body }) {
  const { name, position,code,card_text,banner_text,url } = body || {};
  
  const foundDiscount = await Discount.count({
    where: {
      code: code,
    },
  });

  if (foundDiscount) {
    throw new GenericError(400, '', `Discount already exists!`, foundDiscount);
  }
  const now = moment.utc().toISOString();
  const createDiscount = await Discount.create({
    discount_id: uuidv4(),
    name: name,
    position: position,
    code: code,
    card_text: card_text,
    banner_text: banner_text,
    url: url,
    status: 1,
    created_at: now,
    updated_at: now,
  });

  if (createDiscount) {
    return {
      status: true,
      data: createDiscount
    };
  }
}

/**
 * Get single discount by id.
 * @param req
 * @returns {Promise<any>}
 */
async function getDiscount({ params }) {
  const { discount_id } = params || {}
  return await Discount.findOne({
    where: {
      discount_id: discount_id
    }
  });
}

/**
 * Publish discount by id.
 * @param req
 * @returns {Promise<any>}
 */
async function publish({ params }) {
  const { discount_id } = params || {}
  const foundDiscount = await Discount.findOne({
    where: {
      discount_id: discount_id
    }
  });

  if (!foundDiscount) {
    throw new GenericError(400, '', `Discount does not exist!`, foundDiscount);
  }

  const now = moment.utc().toISOString();
  const [publishDiscount] = await Discount.update(
    {
      is_published: true,
      published_at: now,
      updated_at: now,
    },
    {
      where: {
        discount_id: discount_id,
      },
    }
  );

  return {
    status: true,
    data: publishDiscount
  };
}

/**
 * Publish discount by id.
 * @param req
 * @returns {Promise<any>}
 */
async function unPublish({ params }) {
  const { discount_id } = params || {}
  const foundDiscount = await Discount.findOne({
    where: {
      discount_id: discount_id
    }
  });

  if (!foundDiscount) {
    throw new GenericError(400, '', `Discount does not exist!`, foundDiscount);
  }

  const now = moment.utc().toISOString();
  const [unPublishDiscount] = await Discount.update(
    {
      is_published: false,
      published_start_date: now,
      updated_at: now,
    },
    {
      where: {
        discount_id: discount_id,
      },
    }
  );

  return {
    status: true,
    data: unPublishDiscount
  };
}
/**
 * Set featured discount by id.
 * @param req
 * @returns {Promise<any>}
 */
async function setFeatured({ params }) {
  const { discount_id } = params || {}
  const foundDiscount = await Discount.findOne({
    where: {
      discount_id: discount_id
    }
  });

  if (!foundDiscount) {
    throw new GenericError(400, '', `Discount does not exist!`, foundDiscount);
  }

  const now = moment.utc().toISOString();
  const [setFeaturedDiscount] = await Discount.update(
    {
      is_featured: true,
      updated_at: now,
    },
    {
      where: {
        discount_id: discount_id,
      },
    }
  );

  return {
    status: true,
    data: setFeaturedDiscount
  };
}

/**
 * Update discount by id.
 * @param req
 * @returns {Promise<any>}
 */
async function update({ params, body }) {
  const { article_id } = params || {};
  const { name, code, card_text, banner_text, url, is_featured, is_published, status  } = body || {};
  
  const foundDiscount = await Discount.findOne({
    where: {
       article_id: article_id
    }
  });

  if (!foundDiscount) {
    throw new GenericError(400, '', `Discount does not exist!`, foundDiscount);
  }

  const now = moment.utc().toISOString();
  const [updateDiscount] = await Discount.update(
    {
      name: name,
      code: code,
      card_text: card_text,
      banner_text: banner_text,
      url: url,
      is_published: is_published,
      is_featured: is_featured,
      status: status,
      updated_at: now,
    },
    {
      where: {
        article_id: article_id,
      }
    }
  );

  return {
    status: true,
    data: updateDiscount
  };
}

/**
 * Delete discount by id.
 * @param req
 * @returns {Promise<any>}
 */
async function deleteDiscount({ params }) {
  const { discount_id } = params || {};

  const foundDiscount = await Discount.findOne({
    where: {
      discount_id: discount_id
    }
  });

  if (!foundDiscount) {
    throw new GenericError(400, '', `Discount does not exist!`, foundDiscount);
  }

  const now = moment.utc().toISOString();
  const deleteDiscount = await Discount.update(
    {
      status: false,
      updated_at: now,
      deleted_at: now,
    },
    {
      where: {
        discount_id: discount_id,
      }
    }
  );

  return {
    status: true,
    data: deleteDiscount
  };
}

module.exports = {
  getAll,
  getDiscount,
  create,
  setFeatured,
  publish,
  unPublish,
  update,
  deleteDiscount
};
